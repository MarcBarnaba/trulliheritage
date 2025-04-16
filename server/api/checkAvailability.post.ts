import ICAL from 'ical.js'
import { getIcalUrlBySlug } from '../config/ical'

export interface CheckAvailabilityRequest {
    checkIn: string
    checkOut: string
    guests: string
    trullo: {
        slug: string
    }
    findAlternatives?: boolean // Parametro opzionale per richiedere le alternative
}

interface ValidationResult {
    isValid: boolean
    errorMessage?: string
}

export interface AvailabilityResult {
    available: boolean
    message?: string
    alternativeDates?: {
        checkIn: string
        checkOut: string
    }
}

interface CalendarEvent {
    summary: string
    startDate: Date
    endDate: Date
}

// Funzione di validazione
const validateRequest = (body: any): ValidationResult => {
    // Verifica che tutti i parametri necessari siano presenti
    if (!body.checkIn || !body.checkOut || !body.guests || !body.trullo?.slug) {
        return {
            isValid: false,
            errorMessage: 'Parametri mancanti: sono richiesti checkIn, checkOut, guests e trullo.slug'
        }
    }

    // Converte le date in oggetti Date
    const checkInDate = new Date(body.checkIn)
    const checkOutDate = new Date(body.checkOut)

    // Verifica che le date siano valide
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        return {
            isValid: false,
            errorMessage: 'Date non valide'
        }
    }

    // Verifica che la data di check-out sia successiva alla data di check-in
    if (checkOutDate <= checkInDate) {
        return {
            isValid: false,
            errorMessage: 'La data di check-out deve essere successiva alla data di check-in'
        }
    }

    return { isValid: true }
}

// Funzione per verificare se un intervallo si sovrappone con un evento del calendario
const isOverlapping = (checkInDate: Date, checkOutDate: Date, event: CalendarEvent): boolean => {
    // Un soggiorno si sovrappone con un evento se:
    // 1. La data di check-in è prima della fine dell'evento E
    // 2. La data di check-out è dopo l'inizio dell'evento
    return checkInDate < event.endDate && checkOutDate > event.startDate
}

// Funzione per formattare una data in formato YYYY-MM-DD
const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
}

// Funzione per trovare date alternative disponibili
const findAlternativeDates = (
    requestedCheckIn: Date,
    requestedCheckOut: Date,
    events: CalendarEvent[]
): { checkIn: string, checkOut: string } | null => {
    const stayDuration = Math.ceil((requestedCheckOut.getTime() - requestedCheckIn.getTime()) / (1000 * 60 * 60 * 24))

    // Ordina gli eventi per data di inizio
    const sortedEvents = [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())

    // Trova potenziali periodi disponibili
    let potentialCheckIn = new Date(Math.max(requestedCheckIn.getTime(), Date.now()))

    // Controlla fino a 30 giorni in avanti (ridotto da 90 a 30 giorni)
    const maxSearchDate = new Date()
    maxSearchDate.setDate(maxSearchDate.getDate() + 30)

    while (potentialCheckIn < maxSearchDate) {
        const potentialCheckOut = new Date(potentialCheckIn)
        potentialCheckOut.setDate(potentialCheckIn.getDate() + stayDuration)

        // Verifica se questo periodo è disponibile
        const isAvailable = !sortedEvents.some(event =>
            isOverlapping(potentialCheckIn, potentialCheckOut, event)
        )

        if (isAvailable) {
            return {
                checkIn: formatDate(potentialCheckIn),
                checkOut: formatDate(potentialCheckOut)
            }
        }

        // Se non disponibile, prova con il giorno successivo
        potentialCheckIn.setDate(potentialCheckIn.getDate() + 1)

        // Se siamo arrivati alla data di inizio del prossimo evento, saltiamo direttamente a dopo la sua fine
        for (const event of sortedEvents) {
            if (potentialCheckIn >= event.startDate && potentialCheckIn < event.endDate) {
                potentialCheckIn = new Date(event.endDate)
                break
            }
        }
    }

    // Se non troviamo nulla entro 30 giorni, restituiamo null
    return null
}

// Funzione per scaricare e fare il parsing del file iCal
const parseICal = async (url: string): Promise<CalendarEvent[]> => {
    try {
        // Effettua la richiesta HTTP
        const response = await fetch(url)
        if (!response.ok) {
            console.error(`Errore HTTP: ${response.status}`)
            return []
        }
        // Ottiene il contenuto iCal
        const icalData = await response.text()

        // Analizza il contenuto iCal
        const jcalData = ICAL.parse(icalData)
        const component = new ICAL.Component(jcalData)
        const events = component.getAllSubcomponents('vevent')

        // Mappa gli eventi estratti
        return events.map(event => {
            const summary = event.getFirstPropertyValue('summary')?.toString() || 'Senza titolo'
            const startDate = ICAL.Time.fromDateString(event.getFirstPropertyValue('dtstart')!.toString()).toJSDate();
            const endDate = ICAL.Time.fromDateString(event.getFirstPropertyValue('dtend')!.toString()).toJSDate();

            return { summary, startDate, endDate }
        })

    } catch (error) {
        console.error('Errore durante il parsing iCal:', error)
        return []
    }
}

export default defineEventHandler(async (event) => {
    try {
        // Legge i dati dalla richiesta POST
        const body = await readBody<CheckAvailabilityRequest>(event)

        // Validazione
        const validationResult = validateRequest(body)
        if (!validationResult.isValid) {
            return {
                status: 400,
                body: {
                    available: false,
                    message: validationResult.errorMessage
                }
            }
        }

        // Converte le date in oggetti Date
        const checkInDate = new Date(body.checkIn)
        const checkOutDate = new Date(body.checkOut)

        // Ottiene l'URL del calendario in base allo slug del trullo
        const icalUrl = getIcalUrlBySlug(body.trullo.slug)

        // Recupera gli eventi dal calendario
        const events = await parseICal(icalUrl)

        console.info(`Estratti ${events.length} eventi per il trullo: ${body.trullo.slug}`)

        // Verifica se l'intervallo di date richiesto si sovrappone con uno degli eventi
        const conflittingEvent = events.find(event =>
            isOverlapping(checkInDate, checkOutDate, event)
        )

        // Determina il risultato della disponibilità
        let result: AvailabilityResult

        if (!conflittingEvent) {
            result = {
                available: true,
            }
        } else {
            result = {
                available: false,
            }

            // Cerca date alternative solo se richiesto esplicitamente
            if (body.findAlternatives === true) {
                const alternativeDates = findAlternativeDates(checkInDate, checkOutDate, events)

                if (alternativeDates) {
                    result.alternativeDates = alternativeDates
                }
            }
        }

        return {
            status: 200,
            body: result
        }

    } catch (error) {
        console.error('Errore durante la verifica della disponibilità:', error)

        return {
            status: 500,
            body: {
                available: false
            }
        }
    }
})
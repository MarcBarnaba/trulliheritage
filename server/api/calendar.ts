// server/api/calendar.ts
import { createError, defineEventHandler } from 'h3'
import ical, { ICalCalendar } from 'ical-generator'

export default defineEventHandler(async (event) => {
  try {
    // Recupera i dati dal database o da qualsiasi altra fonte
    const events = await fetchEvents()
    
    // Crea un calendario ICS
    const calendar = ical({
      name: 'Il Mio Calendario',
      prodId: { company: 'MiaAzienda', product: 'Calendario' },
      timezone: 'Europe/Rome'
    })
    
    // Aggiungi eventi al calendario
    events.forEach(event => {
      calendar.createEvent({
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        summary: event.title,
        description: event.description,
        location: event.location,
        url: event.url
      })
    })
    
    // Imposta l'header Content-Type appropriato per file ICS
    event.node.res.setHeader('Content-Type', 'text/calendar; charset=utf-8')
    event.node.res.setHeader('Content-Disposition', 'attachment; filename="calendar.ics"')
    
    // Restituisci il calendario in formato ICS
    return calendar.toString()
  } catch (error) {
    console.error('Errore durante la generazione del calendario:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Errore durante la generazione del calendario'
    })
  }
})

// Funzione di esempio per recuperare gli eventi
// Sostituisci questa funzione con il codice per recuperare i tuoi dati reali
async function fetchEvents() {
  // Qui dovresti implementare la logica per recuperare i tuoi eventi
  // Ad esempio, da un database, un'API esterna, ecc.
  return [
    {
      title: 'Riunione di Team',
      description: 'Discussione settimanale sui progressi del progetto',
      startDate: '2025-03-20T10:00:00',
      endDate: '2025-03-20T11:30:00',
      location: 'Sala Conferenze A',
      url: 'https://meet.example.com/team-meeting'
    },
    {
      title: 'Lancio Prodotto',
      description: 'Presentazione ufficiale del nuovo prodotto',
      startDate: '2025-03-25T14:00:00',
      endDate: '2025-03-25T16:00:00',
      location: 'Auditorium Principale',
      url: 'https://example.com/product-launch'
    }
  ]
}
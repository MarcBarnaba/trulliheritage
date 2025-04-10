import formData from 'form-data'
import Mailgun from 'mailgun.js'

interface EmailRequestBody {
    name: string
    email: string
    message: string
    recipient: string
}

interface MailgunResponse {
    status: number
    id?: string
    message?: string
}

export default defineEventHandler(async (event) => {
    try {
        // Ottieni la configurazione runtime
        const config = useRuntimeConfig()

        // Estrai le credenziali da config
        const mailgunApiKey = config.mailgun.apiKey
        const mailgunDomain = config.mailgun.domain

        // Verifica che le configurazioni siano disponibili
        if (!mailgunApiKey || !mailgunDomain) {
            return createError({
                statusCode: 500,
                statusMessage: 'Configurazione server incompleta: credenziali Mailgun mancanti'
            })
        }

        // Leggi il corpo della richiesta
        const body = await readBody<EmailRequestBody>(event)
        const { name, email, message, recipient } = body

        // Validazione lato server
        if (!name || !email || !message || !recipient) {
            return createError({
                statusCode: 400,
                statusMessage: 'Dati mancanti nel form'
            })
        }

        // Validazione formato email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email) || !emailRegex.test(recipient)) {
            return createError({
                statusCode: 400,
                statusMessage: 'Formato email non valido'
            })
        }

        // Inizializza Mailgun
        const mailgun = new Mailgun(formData)
        const mg = mailgun.client({
            username: 'api',
            key: mailgunApiKey
        })

        // Configura il messaggio
        const mailData = {
            from: `Form Contatti <noreply@${mailgunDomain}>`,
            to: recipient,
            'h:Reply-To': email,
            subject: `Nuovo messaggio da ${name}`,
            text: `Hai ricevuto un nuovo messaggio dal form di contatto.

    Nome: ${name}
    Email: ${email}
    Messaggio:
    ${message}`,
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>Nuovo messaggio dal form di contatto</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Messaggio:</strong></p>
            <div style="border-left: 4px solid #ccc; padding-left: 1rem; margin: 1rem 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>`
        }

        const response = await mg.messages.create(
            mailgunDomain,
            mailData
        ) as MailgunResponse

        console.log(response)

        if (response.status !== 200) {
            throw new Error(`Errore nell'invio dell'email: ${response.message || 'Risposta inaspettata da Mailgun'}`)
        }

        return {
            success: true,
            message: 'Email inviata con successo',
            id: response.id
        }
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email:', error)
        createError({
            statusCode: 500,
            statusMessage: 'Errore durante l\'invio dell\'email',
            data: {
                error: error instanceof Error ? error.message : 'Errore sconosciuto'
            }
        })
        return {
            success: true,
            message: 'Email inviata con successo'
        }


    }
})
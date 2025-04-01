import ICAL from 'ical.js';

// URL del file iCal di Booking.com
const ICAL_URL = 'https://ical.booking.com/v1/export?t=0e1c40f0-1f02-47e7-8584-10b1a12b48c3';

// Definizione dell'interfaccia per un evento
interface CalendarEvent {
  summary: string;
  startDate: Date;
  endDate: Date;
}

// Funzione per scaricare e fare il parsing del file iCal
const parseICal = async (url: string): Promise<CalendarEvent[]> => {
  try {
    // Effettua la richiesta HTTP
    // const response = await fetch(url);
    // if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);

    // Ottiene il contenuto iCal
    const icalData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//admin.booking.com\\\, b.v.//NONSGML v1.0//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTAMP:20250316T153617Z
DTSTART;VALUE=DATE:20250408
DTEND;VALUE=DATE:20250409
UID:ab8907e00fb0089a06e5acfdea101250@booking.com
SUMMARY:CLOSED - Not available
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250316T153617Z
DTSTART;VALUE=DATE:20250425
DTEND;VALUE=DATE:20250427
UID:13bcc16d5d6b88c6aa2ea272d6f674a4@booking.com
SUMMARY:CLOSED - Not available
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250316T153617Z
DTSTART;VALUE=DATE:20250512
DTEND;VALUE=DATE:20250513
UID:fc52e780537991ebb203898f1feac3f4@booking.com
SUMMARY:CLOSED - Not available
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250316T153617Z
DTSTART;VALUE=DATE:20250531
DTEND;VALUE=DATE:20250601
UID:a84c2726e1c56aec7eb3d856e5a6e974@booking.com
SUMMARY:CLOSED - Not available
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250316T153617Z
DTSTART;VALUE=DATE:20250617
DTEND;VALUE=DATE:20250618
UID:009ae734be9dbca8ce031c65f5d63a8d@booking.com
SUMMARY:CLOSED - Not available
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250316T153617Z
DTSTART;VALUE=DATE:20251101
DTEND;VALUE=DATE:20260316
UID:2c5831ea13795c2dbf85b0cdf795a2c5@booking.com
SUMMARY:CLOSED - Not available
END:VEVENT
BEGIN:VEVENT
DTSTAMP:20250316T153617Z
DTSTART;VALUE=DATE:20260317
DTEND;VALUE=DATE:20260916
UID:cf7c24941bb1175dcdc944b36f0e45b6@booking.com
SUMMARY:CLOSED - Not available
END:VEVENT
END:VCALENDAR
`

    // Analizza il contenuto iCal
    const jcalData = ICAL.parse(icalData);
    const component = new ICAL.Component(jcalData);
    const events = component.getAllSubcomponents('vevent');

    // Mappa gli eventi estratti
    return events.map(event => {
      const summary = event.getFirstPropertyValue('summary')?.toString() || 'Senza titolo';
      const startDate = ICAL.Time.fromDateString(event.getFirstPropertyValue('dtstart')!.toString()).toJSDate();
      const endDate = ICAL.Time.fromDateString(event.getFirstPropertyValue('dtend')!.toString()).toJSDate();

      return { summary, startDate, endDate };
    });

  } catch (error) {
    console.error('Errore durante il parsing iCal:', error);
    return [];
  }
};

// Esegui il parsing e stampa il risultato
// parseICal(ICAL_URL).then(events => {
//   console.log('📅 Eventi trovati:', events);
// });
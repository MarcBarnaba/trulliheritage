export interface TrulloCalendarConfig {
    slug: string;
    icalUrl: string;
}

/**
 * Mappa degli URL iCal per i trulli.
 * La chiave è lo slug del trullo e il valore è l'URL iCal.
 */
const trulloIcalUrls: Record<string, string> = {
    'trullo-bianco': 'https://ical.booking.com/v1/export?t=xxx&property=trullo-bianco',
    'trullo-azzurro': 'https://ical.booking.com/v1/export?t=yyy&property=trullo-azzurro',
};

/**
 * Recupera l'URL iCal per un trullo dato il suo slug.
 * 
 * @param slug Lo slug del trullo
 * @returns L'URL iCal del trullo
 * @throws Error se lo slug non è valido o non esiste nella configurazione
 */
export function getIcalUrlBySlug(slug: string): string {
    // Verifica la validità dello slug per sicurezza
    if (!slug || typeof slug !== 'string') {
        throw new Error('Slug non valido');
    }

    const icalUrl = trulloIcalUrls[slug];

    if (!icalUrl) {
        throw new Error(`Trullo con slug "${slug}" non trovato`);
    }

    return icalUrl;
}

/**
 * Recupera la lista di tutti i trulli con i loro URL iCal.
 * 
 * @returns Array di oggetti contenenti slug e URL iCal
 */
export function getAllTrulloCalendars(): TrulloCalendarConfig[] {
    return Object.entries(trulloIcalUrls).map(([slug, icalUrl]) => ({
        slug,
        icalUrl
    }));
}
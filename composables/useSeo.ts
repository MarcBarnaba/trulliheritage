interface SeoOptions {
    title?: string
    description?: string
    ogImage?: string
    siteName?: string
    baseUrl?: string
    locale?: string
    type?: string
    twitterHandle?: string
    twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
    canonicalPath?: string
    noIndex?: boolean
}

export const useSeo = (options: SeoOptions = {}) => {
    const route = useRoute()
    const { locale } = useI18n()

    // Recupera le configurazioni globali dalle env o da un file di config
    const config = useRuntimeConfig()
    const baseUrl = options.baseUrl || config.public.siteUrl || 'https://trulliheritage.com'

    // Imposta il path canonico
    const canonicalPath = options.canonicalPath || route.path
    const canonicalUrl = `${baseUrl}${canonicalPath}`

    // Default siteName dai config globali
    const siteName = 'Trulli Heritage'

    // Gestione SEO con useSeoMeta
    useSeoMeta({
        // Meta tag base
        title: `${options.title} | ${siteName}`,
        description: options.description,

        // Open Graph
        ogTitle: options.title,
        ogDescription: options.description,
        ogImage: options.ogImage ? (options.ogImage.startsWith('http') ? options.ogImage : `${baseUrl}${options.ogImage}`) : `${baseUrl}/default-og-image.jpg`,
        ogSiteName: siteName,
        ogUrl: canonicalUrl,
        ogLocale: options.locale || locale.value || 'it',
        ogType: 'website',

        // Robots
        robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',
    })

    // Utilizzare useHead per il link canonico e altri elementi non coperti da useSeoMeta
    useHead({
        link: [
            { rel: 'canonical', href: canonicalUrl }
        ],
        // Eventuali altri elementi head che potrebbero essere necessari
    })

    // Restituisci alcuni metodi utili per aggiornare i meta tag dinamicamente
    return {
        updateTitle: (newTitle: string) => useSeoMeta({ title: newTitle, ogTitle: newTitle, twitterTitle: newTitle }),
        updateDescription: (newDescription: string) => useSeoMeta({ description: newDescription, ogDescription: newDescription, twitterDescription: newDescription }),
        updateImage: (newImage: string) => {
            const fullImageUrl = newImage.startsWith('http') ? newImage : `${baseUrl}${newImage}`
            useSeoMeta({ ogImage: fullImageUrl, twitterImage: fullImageUrl })
        }
    }
}
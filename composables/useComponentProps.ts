
// Definiamo un tipo per rappresentare gli elementi della pagina
export interface PageComponent {
    type: string
    props: Record<string, string>
}

export interface PageData {
    title: string
    description?: string
    components: PageComponent[]
}

/**
 * Composable che gestisce il recupero delle props dei componenti
 * @param pageData I dati della pagina con i componenti e le loro props
 * @returns Funzioni per lavorare con i componenti
 */
export function useComponentProps(pageData: PageData | null) {
    // Funzione che restituisce le props di un componente dato il suo tipo
    const getComponentProps = (componentType: string): Record<string, any> => {
        if (!pageData || !pageData.components) return {}

        const component = pageData.components.find(comp => comp.type === componentType)
        if (!component) return {}

        return component.props
    }

    // Funzione per convertire le props del TextImg al formato richiesto dal componente
    const getTextImgProps = (): Record<string, any> => {
        const props = getComponentProps('TextImg')
        if (Object.keys(props).length === 0) return {}

        // Ricostruisce l'oggetto paragraph secondo la struttura attesa dal componente
        return {
            paragraph: {
                titleSize: props.paragraphTitleSize || '3xl',
                title: props.paragraphTitle || '',
                paragraph: props.paragraphText || ''
            },
            imgPath: props.imgPath || ''
        }
    }

    // Funzione per verificare se un componente esiste nella pagina
    const hasComponent = (componentType: string): boolean => {
        if (!pageData || !pageData.components) return false
        return pageData.components.some(comp => comp.type === componentType)
    }

    return {
        getComponentProps,
        getTextImgProps,
        hasComponent
    }
}
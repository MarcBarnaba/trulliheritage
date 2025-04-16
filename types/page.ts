import { z } from 'zod'

export const PageSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    components: z.array(
        z.object({
            type: z.string(), // Il nome del componente (es: "Hero", "Quote", "TextImg")
            props: z.record(z.any()), // Qualsiasi prop
        })
    )
})
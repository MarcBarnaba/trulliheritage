import { z } from 'zod'

export const ExperienceSchema = z.object({
    slug: z.string(),
    title: z.string(),
    shortDescription: z.string().optional(),
    description: z.string(),
    coverImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    location: z.string(),
    duration: z.string(), // es. "3h", "2 giorni"
    maxParticipants: z.number(),
    price: z.number(),
    included: z.array(z.string()), // es. ["Guida locale", "Bevande"]
    whatToBring: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(), // es. ["en", "it"]
    host: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        description: z.string()
    }),
    reviews: z.array(z.object({
        name: z.string(),
        rating: z.number().min(1).max(5),
        text: z.string(),
        date: z.string().optional()
    })).optional()
})

export type ExperienceType = z.infer<typeof ExperienceSchema>

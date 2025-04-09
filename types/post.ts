import { z } from 'zod'

export const PostSchema = z.object({
    slug: z.string(),
    title: z.string(),
    coverImage: z.string().optional(),
    author: z.object({
        name: z.string(),
        avatar: z.string().optional()
    }),
    date: z.string(), // ISO string
    excerpt: z.string().optional(),
    content: z.string(), // può essere Markdown/HTML
    tags: z.array(z.string()).optional(),
    readingTime: z.string().optional() // es. "5 min read"
})

export type PostType = z.infer<typeof PostSchema>

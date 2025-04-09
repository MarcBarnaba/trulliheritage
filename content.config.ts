import { defineCollection, defineContentConfig } from '@nuxt/content'
import { TrulloSchema } from './types/trullo'
import { PostSchema } from './types/post'
import { ExperienceSchema } from './types/experience'
import { locales } from './config/locales'

const localeCodes = locales.map(locale => locale.code)

const collections: Record<string, ReturnType<typeof defineCollection>> = {}

// Trulli
for (const locale of localeCodes) {
    collections[`${locale}_trulli`] = defineCollection({
        source: `${locale}/trulli/*.json`,
        type: 'page',
        schema: TrulloSchema
    })
}

// Posts
for (const locale of localeCodes) {
    collections[`${locale}_posts`] = defineCollection({
        source: `${locale}/posts/*.json`,
        type: 'page',
        schema: PostSchema
    })
}

// Experiences
for (const locale of localeCodes) {
    collections[`${locale}_experiences`] = defineCollection({
        source: `${locale}/experiences/*.json`,
        type: 'page',
        schema: ExperienceSchema
    })
}

export default defineContentConfig({
    collections
})

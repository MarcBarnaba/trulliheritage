import { defineCollection, defineContentConfig } from '@nuxt/content'
import { TrulloSchema } from './types/trullo'
import { PostSchema } from './types/post'
import { ExperienceSchema } from './types/experience'
import { locales } from './config/locales'
import { PageSchema } from './types/page'

const localeCodes = locales.map(locale => locale.code)

const collections: Record<string, ReturnType<typeof defineCollection>> = {}

// Pages
for (const locale of localeCodes) {
    collections[`${locale}_pages`] = defineCollection({
        source: `${locale}/pages/*.json`,
        type: 'page',
        schema: PageSchema
    })
}

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

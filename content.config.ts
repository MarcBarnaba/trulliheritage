import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { TrulloSchema } from './types/trullo'

export default defineContentConfig({
    collections: {
        en: defineCollection({
            source: 'en/trulli/*.json',
            type: 'page',
            schema: TrulloSchema
        }),
        it: defineCollection({
            source: 'it/trulli/*.json',
            type: 'page',
            schema: TrulloSchema
        })
    }
})

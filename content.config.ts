import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: 'page',
      source: 'news/**',
      schema: z.object({
        date: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
    promo: defineCollection({
      type: 'page',
      source: 'promo/**',
      schema: z.object({
        date: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
        categoryUrl: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
  },
})

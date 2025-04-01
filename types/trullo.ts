import { z } from "zod";

export const TrulloSchema = z.object({
    slug: z.string(),
    name: z.string(),
    coverImage: z.string().optional(),
    images: z.array(z.string()),
    maxGuests: z.number(),
    reviewsCount: z.number(),
    rating: z.number(),
    location: z.string(),
    pricePerNight: z.number().optional(),
    description: z.string(),
    shortDescription: z.string().optional(),
    nightInfo: z.array(z.object({
        icon: z.string(),
        text: z.string(),
    })),
    services: z.array(z.object({
        icon: z.string(),
        text: z.string(),
    })),
    amenities: z.array(z.object({
        icon: z.string(),
        text: z.string(),
    })),
    rules: z.array(z.object({
        allowed: z.boolean(),
        text: z.string(),
    })),
    usefulInfo: z.array(z.object({
        text: z.string(),
    })),
    owner: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        since: z.string(),
        description: z.string(),
        phone: z.string(),
    })
});

export type TrulloType = z.infer<typeof TrulloSchema>;

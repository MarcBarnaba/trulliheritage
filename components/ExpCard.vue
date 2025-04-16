<template>
    <div class="min-w-84 min-h-96 border rounded bg-white shadow-md hover:shadow-lg transition duration-200">
        <NuxtLink :to="localePath(`/experiences/${experience.slug}`)">
            <div class="relative">
                <img :src="experience.coverImage" alt="Experience Cover Image"
                    class="w-full h-48 object-cover rounded-tl rounded-tr">

                <!-- Info badges over image -->
                <div class="absolute bottom-2 left-2 flex gap-2">
                    <span class="bg-white/90 px-2 py-1 rounded-full text-xs flex items-center shadow-sm">
                        <span class="material-icons text-gray-600 text-sm mr-1">location_on</span>
                        <span>{{ experience.location }}</span>
                    </span>
                    <span class="bg-white/90 px-2 py-1 rounded-full text-xs flex items-center shadow-sm">
                        <span class="material-icons text-gray-600 text-sm mr-1">schedule</span>
                        <span>{{ experience.duration }}</span>
                    </span>
                </div>

                <!-- Participants badge - more prominent -->
                <div
                    class="absolute bottom-2 right-2 bg-emerald-600/90 text-white px-2 py-1 rounded-full flex items-center shadow-sm">
                    <span class="material-icons text-white text-md mr-1">groups</span>
                    <span class="text-xs font-semibold">{{ experience.maxParticipants }}</span>
                </div>

                <!-- Rating badge if available -->
                <div v-if="experience.reviews?.length"
                    class="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center shadow-sm">
                    <span class="material-icons text-yellow-500 text-sm">star</span>
                    <span class="ml-1 text-xs font-medium">{{ getAverageRating(experience.reviews) }}</span>
                </div>
            </div>

            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-semibold">{{ experience.title }}</h3>
                    <span v-if="showPrice" class="text-lg font-semibold text-emerald-600 ml-2">{{ experience.price
                    }}€</span>
                </div>

                <div class="text-gray-600 text-sm">
                    {{ experience.shortDescription ?? (experience.description && experience.description?.length > 120 ?
                        experience.description.substring(0, 120) + '...' : experience.description) }}
                </div>

                <!-- Host info and languages horizontally aligned -->
                <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <!-- Host info -->
                    <div v-if="experience.host" class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            <img v-if="experience.host.avatar" :src="experience.host.avatar"
                                class="w-full h-full object-cover" :alt="`${experience.host.name} avatar`">
                            <span v-else
                                class="material-icons text-gray-400 flex items-center justify-center h-full">person</span>
                        </div>
                        <div class="ml-2">
                            <p class="text-xs text-gray-500">Host</p>
                            <p class="text-sm font-medium">{{ experience.host.name }}</p>
                        </div>
                    </div>

                    <!-- Languages as uppercase codes -->
                    <div v-if="experience.languages?.length" class="flex gap-1 items-center">
                        <span v-for="lang in experience.languages" :key="lang"
                            class="text-xs px-2 py-0.5 bg-gray-100 rounded-full uppercase font-medium">
                            {{ lang }}
                        </span>
                    </div>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { ExperienceType } from '~/types/experience';

const localePath = useLocalePath();

const props = withDefaults(defineProps<{
    experience: Partial<ExperienceType>,
    showPrice?: boolean
}>(), {
    showPrice: true
});

const getAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews?.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
};
</script>
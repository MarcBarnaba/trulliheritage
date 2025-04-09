<template>
    <div class="min-w-96 border rounded bg-white shadow-md hover:shadow-lg transition duration-200">
        <NuxtLink :to="localePath(`/trulli/${structure.slug}`)">
            <div class="bg-white">
                <img :src="structure.coverImage" alt="Trullo Cover Image"
                    class="mb-4 w-full h-48 object-cover rounded-tl rounded-tr">
                <div class="bg-white flex justify-between items-center mb-2 p-4">
                    <h3 class="text-xl font-semibold mr-2">{{ structure.name }}</h3>
                    <span class="flex items-center">
                        <span>{{ structure.maxGuests }}</span>
                        <span class="material-icons text-gray-600 ml-2">person</span>
                    </span>
                </div>
                <div class="bg-white mb-4 px-4 text-gray-600">{{ structure.shortDescription ??
                    structure.description }}</div>
            </div>
        </NuxtLink>

        <div class="bg-white p-4 border-t">
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-start justify-start gap-3">

                    <span v-for="(info, index) in structure.nightInfo" :key="`night-${index}`"
                        class="flex items-center">
                        <span>{{ info.text[0] }}</span>
                        <span class="material-icons text-gray-600 ml-2">{{ info.icon }}</span>
                    </span>
                </div>
                <div class="flex items-center justify-between gap-3">

                    <span v-for="(amenity, index) in structure.services" :key="`amenity-${index}`"
                        class="flex items-center">
                        <span class="material-icons text-gray-600 text-md">{{ amenity.icon }}</span>
                    </span>
                    <span v-for="(amenity, index) in structure.amenities" :key="`amenity-${index}`"
                        class="flex items-center">
                        <span class="material-icons text-gray-600 text-md">{{ amenity.icon }}</span>
                    </span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { TrulloType } from '~/types/trullo';

const localePath = useLocalePath()

defineProps<{
    structure: Partial<TrulloType>
}>()
</script>
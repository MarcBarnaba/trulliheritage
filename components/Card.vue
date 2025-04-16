<template>
    <div class="min-w-84 border rounded bg-white shadow-md hover:shadow-lg transition duration-200">
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
                <div class="bg-white mb-4 px-4 text-gray-600 text-sm">{{ structure.shortDescription ??
                    structure.description }}</div>
            </div>
        </NuxtLink>

        <div class="bg-white p-4 border-t">
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-start justify-start gap-3">

                    <span v-for="(info, index) in structure.nightInfo" :key="`night-${index}`"
                        class="flex items-center relative group">
                        <span>{{ info.text[0] }}</span>
                        <span class="material-icons text-gray-600 ml-2">{{ info.icon }}</span>
                        <div class="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                            <div :class="tooltipClasses">
                                {{ info.text }}
                            </div>
                        </div>
                    </span>
                </div>
                <div class="flex items-center justify-between gap-3">

                    <span v-for="(amenity, index) in structure.services" :key="`service-${index}`"
                        class="flex items-center relative group">
                        <span class="material-icons text-gray-600 text-md">{{ amenity.icon }}</span>
                        <div class="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                            <div :class="tooltipClasses">
                                {{ amenity.text }}
                            </div>
                        </div>
                    </span>
                    <span v-for="(amenity, index) in structure.amenities" :key="`amenity-${index}`"
                        class="flex items-center relative group">
                        <span class="material-icons text-gray-600 text-md">{{ amenity.icon }}</span>
                        <div class="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                            <div :class="tooltipClasses">
                                {{ amenity.text }}
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import type { TrulloType } from '~/types/trullo';
import { computed } from 'vue';

const localePath = useLocalePath()

defineProps<{
    structure: Partial<TrulloType>
}>()

const tooltipClasses = computed(() => {
    return 'bg-gray-800 text-white text-xs text-center rounded py-1 px-2 shadow-lg min-w-24';
});
</script>
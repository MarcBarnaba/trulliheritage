<template>
  <section id="structures" class="py-16 px-8">
    <Paragraph title="Trulli" titleSize="3xl" :showMoreBtn="showMore" :showMorePath="localePath(showMorePath)" />
    <div class="container w-full px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(structure, index) in structures" :key="index"
          class="border rounded bg-white shadow-md hover:shadow-lg transition duration-200">
          <div class="bg-white">
            <img :src="structure.coverImage" alt="Immagine del trullo"
              class="mb-4 w-full h-48 object-cover rounded-tl rounded-tr">
            <div class="bg-white flex justify-between items-center mb-2 p-4">
              <h3 class="text-xl font-semibold mr-2">{{ structure.name }}</h3>
              <div class="flex justify-center items-center">
                <h2 class="mr-2">{{ structure.maxGuests }}</h2>
                <IconsUser />
              </div>
            </div>
            <div class="bg-white mb-4 px-4 text-gray-600">{{ structure.shortDescription ??
              structure.description }}</div>
          </div>

          <div class="bg-white flex justify-between items-center p-4 border-t">
            <div class="flex items-center gap-3">
              <span v-for="(amenity, index) in structure.amenities" :key="`amenity-${index}`" class="flex items-center">
                <span class="material-icons text-gray-600 text-md">{{ amenity.icon }}</span>
              </span>
            </div>
            <Buttoon :url="`/trulli/${structure.slug}`" color="#FFFFFF" :textWhite="false" :text="'Scopri'"
              :show-icon="true" />
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">
import type { TrulloType } from '~/types/trullo';

const localePath = useLocalePath()

withDefaults(defineProps<{
  structures: Partial<TrulloType>[],
  showMore?: boolean,
  showMorePath?: string
}>(), {
  showMore: false,
  showMorePath: '/trulli'
})

</script>
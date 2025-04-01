<template>
  <section id="structures" class="py-16 px-8">
    <h2 class="text-3xl font-bold mb-4">Trulli</h2>
    <div class="container w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(structure, index) in structures" :key="index" class="border rounded bg-white">
          <div class="bg-white">
            <img :src="structure.coverImage" alt="Immagine del trullo"
              class="mb-4 w-full h-48 object-cover rounded-tl rounded-tr">
            <div class="bg-white flex justify-between items-center mb-2 p-4">
              <h3 class="text-xl font-semibold">{{ structure.name }}</h3>
              <div class="flex justify-center items-center">
                <h2 class="mr-2">{{ structure.maxGuests }}</h2>
                <IconsUser />
              </div>
            </div>
            <div class="bg-white mb-4 px-4">{{ structure.shortDescription ?? structure.description }}</div>

          </div>

          <div class="bg-white flex justify-between items-center px-4">
            <div class="w-1/2 flex justify-center items-center gap-4">
              <li v-for="(amenity, index) in structure.amenities" :key="`amenity-${index}`" class="flex items-center">
                <span class="material-icons text-gray-600 mr-2">{{ amenity.icon }}</span>
              </li>
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

defineProps<{
  structures: Partial<TrulloType>[]
}>()
</script>
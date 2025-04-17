<template>
  <div :class="[
    'relative overflow-hidden',
    slim ? 'h-96' : 'h-screen'
  ]">
    <NuxtImg preload :src="imgSrc" class="object-cover w-full h-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center text-center overflow-hidden " :class="[
      slim ? 'pt-8' : 'pt-16'
    ]">
      <div class="mt-48 ">
        <h1 v-if="title" class="text-white italic font-bold p-4" :class="[
          slim ? 'text-3xl' : 'text-5xl'
        ]">{{ title }}</h1>
        <h1 class="text-white italic p-4 pb-8" :class="[
          slim ? 'text-xl' : 'text-5xl'
        ]">{{ tagline }}</h1>
      </div>
      <TravelBar v-if="showTravelBar" class="hidden md:flex" />
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface HeroProps {
  imgSrc: string;
  title?: string;
  tagline: string;
  showTravelBar: boolean;
  slim?: boolean;
}
defineProps<HeroProps>();

</script>

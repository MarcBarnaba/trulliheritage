<template>
  <div :class="[
    'relative overflow-hidden',
    slim ? 'h-96' : 'h-screen'
  ]">
    <NuxtImg preload :src="imgSrc" :alt="imgAlt || title || 'Hero background'" class="object-cover w-full h-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4"
      :class="[
        slim ? 'py-8' : 'py-16'
      ]">
      <div class="max-w-4xl">
        <h1 v-if="title" class="text-white italic font-bold mb-2 sm:mb-4 leading-tight" :class="[
          slim ? 'text-2xl sm:text-3xl md:text-4xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
        ]">
          {{ title }}
        </h1>
        <p class="text-white italic mb-8" :class="[
          slim ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'
        ]">
          {{ tagline }}
        </p>
        <div class="mt-4 sm:mt-6 md:mt-8">
          <slot name="btn"></slot>
        </div>
      </div>
      <TravelBar v-if="showTravelBar" class="hidden md:flex mt-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface HeroProps {
  imgSrc: string;
  imgAlt?: string;
  title?: string;
  tagline: string;
  showTravelBar: boolean;
  slim?: boolean;
}
defineProps<HeroProps>();
</script>
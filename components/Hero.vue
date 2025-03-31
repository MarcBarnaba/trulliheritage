<template>
  <div class="relative w-full h-screen overflow-hidden">
    <NuxtImg src="hero2.jpg" class="object-cover w-full h-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center text-center pt-96">
      <h1 class="text-white italic text-5xl font-bold p-4 mt-32">{{ title }}</h1>
      <h1 class="text-white italic text-3xl p-4 pb-8">{{ tagline }}</h1>
      <TravelBar class="hidden md:flex" />
      <slot name="btn"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string;
  tagline: string;
  showTravelBar: boolean;
}>();

</script>

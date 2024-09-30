<template>
  <div class="relative w-full h-screen overflow-hidden">
    <NuxtImg src="/hero.jpg" class="object-cover w-full h-full" />
    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-end">
      <div class="w-5/6">
        <h1 class="text-white text-5xl text-right font-bold p-4 pb-8">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  title: string;
}>();

</script>

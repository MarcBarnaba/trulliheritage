<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
    <div class="col-span-1 flex-col w-full">
      <div 
        v-for="(image, index) in images.slice(0,2)" 
        :key="index"
        :class="index % 2 === 0 ? 'aspect-w-16' : 'aspect-w-9'"
        class="overflow-hidden w-full"
      >
        <NuxtImg 
          :src="image" 
          alt="Image" 
          class="object-cover w-full h-full pb-2"
        />
      </div>
    </div>
    <div class="col-span-1 flex-col w-full">
      <div 
        v-for="(image, index) in images.slice(2)" 
        :key="index"
        :class="index % 2 !== 0 ? 'aspect-w-16' : 'aspect-w-9'"
        class="overflow-hidden w-full"
      >
        <NuxtImg 
          :src="image" 
          alt="Image" 
          class="object-cover w-full h-full pb-2"
        />
      </div>
    </div>
</div>
  </template>
  
  <script setup lang="ts">
  
  const props = defineProps({
    images: {
      type: Array as () => string[],
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .aspect-w-16 {
    aspect-ratio: 16 / 9;
  }
  
  .aspect-w-9 {
    aspect-ratio: 9 / 16;
  }
  </style>
  
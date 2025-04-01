<template>
  <div class="flex flex-col lg:flex-row items-center mx-auto h-auto md:h-80 lg:h-80 overflow-hidden">
    <NuxtImg :src="imgPath" class="w-full lg:w-2/4 max-w-full object-contain" />
    <!-- <Parallax :src="imgPath" class="w-full lg:w-2/4 max-w-full object-contain" /> -->
    <div class="max-w-1/2 ml-8">
      <IconsMint />
      <Paragraph align="left" v-bind="paragraph" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParagraphProps } from './Paragraph.vue';


defineProps<{
  paragraph: ParagraphProps,
  imgPath: string;
}>();
</script>
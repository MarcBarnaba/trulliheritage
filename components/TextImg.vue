<template>
  <div class="flex flex-col lg:flex-row items-center mx-auto h-auto overflow-hidden">
    <NuxtImg :src="imgPath" class="w-full lg:w-1/2 object-cover lg:h-full" />
    <div class="w-full lg:w-1/2 lg:pl-8 py-4 lg:py-0">
      <IconsMint class="mb-4" />
      <Paragraph align="left" v-bind="paragraph" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParagraphProps } from './Paragraph.vue';

defineProps<{
  paragraph: ParagraphProps;
  imgPath: string;
}>();
</script>
<template>
  <NuxtLink :to="url" class="group inline-block w-48 h-12 rounded-full overflow-hidden"
    :style="{ backgroundColor: color }">
    <div class="flex items-center justify-center h-full px-5 py-4">
      <span :class="`text-${textWhite ? 'white' : 'black'} font-bold`">{{ text }}</span>
      <IconsArrowUR v-if="showIcon" :color="textWhite ? '#FFFFFF' : '#000000'" class="ml-2" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    text: string;
    textWhite?: boolean;
    url?: string;
    color?: string;
    showIcon?: boolean;
  }>(),
  {
    textWhite: true,
    color: "#000000", // Default color (black)
    showIcon: false
  }
);
</script>

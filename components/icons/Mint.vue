<template>

  <svg class="absolute -z-50" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" :width="width" :height="height">
    <path fill="#89B0AE"
      d="M31.7,-35.8C39,-24.3,41.5,-12.2,41.1,-0.4C40.7,11.3,37.3,22.7,30,34C22.7,45.3,11.3,56.6,-2.9,59.4C-17,62.3,-34.1,56.7,-50.3,45.4C-66.5,34.1,-81.8,17,-78.5,3.3C-75.2,-10.4,-53.2,-20.8,-37,-32.3C-20.8,-43.8,-10.4,-56.4,0.9,-57.3C12.2,-58.2,24.3,-47.4,31.7,-35.8Z"
      transform="translate(100 100)" />
  </svg>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width: number;
    height: number;
  }>(),
  {
    width: 132,
    height: 132
  }
);
</script>
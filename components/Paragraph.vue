<template>
  <div :class="alignmentClass">
    <div class="relative w-full">
      <slot></slot>
      <div :class="slotsClass">
        <div v-if="title" :class="titleClass">{{ title }}</div>
        <p class="text-base text-gray-700">{{ paragraph }}</p>
        <slot name="btn"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ParagraphProps {
  align?: "center" | "left" | "right";
  title?: string;
  titleSize?:
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";
  paragraph?: string;
}

const props = withDefaults(defineProps<ParagraphProps>(), {
  align: "center",
  titleSize: "base",
});

const titleClass = computed(() => `text-${props.titleSize} font-bold mb-4`);

const alignmentClass = computed(
  () => `text-${props.align} p-8 `
);

const slotsClass = computed(
  () => `flex-col justify-center items-${props.align} `
);
</script>

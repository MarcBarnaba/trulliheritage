<template>
  <div :class="alignmentClass">
    <div class="relative w-full">
      <slot></slot>
      <div :class="slotsClass">
        <div class="flex justify-between items-center">
          <div v-if="title" :class="titleClass">{{ title }}</div>
          <NuxtLink v-if="showMoreBtn" :to="showMorePath">
            <div class="rounded-full border">
              <span class="material-icons text-white bg-gold rounded-full p-2 hover:cursor-pointer">arrow_right_alt
              </span>
            </div>
          </NuxtLink>
        </div>
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
  showMoreBtn?: boolean;
  showMorePath?: string;
}

const props = withDefaults(defineProps<ParagraphProps>(), {
  align: "center",
  titleSize: "base",
  showMoreBtn: false,
  showMorePath: '/'
});

const titleClass = computed(() => `text-${props.titleSize} font-bold ${props.showMoreBtn ? '' : 'mb-4'} `);

const alignmentClass = computed(
  () => `text-${props.align} p-8 `
);

const slotsClass = computed(
  () => `flex-col justify-center items-${props.align} `
);
</script>

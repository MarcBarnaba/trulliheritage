<template>
    <div class="accordion">
      <div class="accordion-item" v-for="(item, index) in items" :key="index">
        <button
          @click="toggle(index)"
          class="w-full text-left py-2 text-lg transition-all duration-100 ease-in-out"
          :class="isActive(index) ? 'font-bold' : 'font-normal'"
        >
          {{ item.title }}
        </button>
  
        <transition name="accordion">
          <div
            v-if="isActive(index)"
            class="pl-4 py-2 transition-all duration-150 ease-in-out accordion-content"
          >
            <slot :name="'content-' + index">{{ item.content }}</slot>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface AccordionItem {
    title: string;
    content: string;
  }
  
  const items = ref<AccordionItem[]>([
    { title: 'Section 1', content: 'This is the content for section 1.' },
    { title: 'Section 2', content: 'This is the content for section 2.' },
    { title: 'Section 3', content: 'This is the content for section 3.' },
  ]);
  
  const activeIndex = ref<number | null>(null);
  
  const toggle = (index: number) => {
    activeIndex.value = activeIndex.value === index ? null : index;
  };
  
  const isActive = (index: number) => {
    return activeIndex.value === index;
  };
  </script>
  
  <style scoped>
  /* Accordion content animation */
  .accordion-enter-active, .accordion-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .accordion-enter-from, .accordion-leave-to {
    transform: scaleY(0);
    opacity: 0;
  }
  .accordion-enter-to, .accordion-leave-from {
    transform: scaleY(1);
    opacity: 1;
  }
  .accordion-content {
    transform-origin: top; /* Keeps content opening from the top */
  }
  </style>
  
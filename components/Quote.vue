<template>
  <div class="flex justify-center items-center h-64 my-16 mx-16">
    <p class="text-2xl md:text-3xl lg:text-5xl text-center">
      <span class="text-black font-bold italic">{{ firstWord }}</span>
      <span class="text-gray-500 italic">{{ ` ${remainingText}` }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
export interface QuoteProps {
  text: string;
}
const props = defineProps<QuoteProps>();

// Divide il testo nella prima parola e nel resto
const [firstWord, ...rest] = props.text.split(" ");
const remainingText = rest.join(" ");
</script>

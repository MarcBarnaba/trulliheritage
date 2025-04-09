<template>
  <section id="structures" class="py-16 px-8">
    <Paragraph v-if="title" :title="title" titleSize="3xl" :showMoreBtn="showMore"
      :showMorePath="localePath(showMorePath)" />
    <div class="container w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card v-for="(structure, index) in structures" :key="index" :structure="structure" />
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">
import type { TrulloType } from '~/types/trullo';

const localePath = useLocalePath()

withDefaults(defineProps<{
  title?: string
  structures: Partial<TrulloType>[],
  showMore?: boolean,
  showMorePath?: string
}>(), {
  showMore: false,
  showMorePath: '/trulli'
})

</script>
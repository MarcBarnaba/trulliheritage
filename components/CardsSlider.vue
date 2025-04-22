<template>
  <section id="structures" class="py-8 px-8">
    <Paragraph v-if="title" :title="title" titleSize="3xl" :showMoreBtn="showMore" align="left"
      :showMorePath="localePath(showMorePath)" />
    <Swiper :modules="[Pagination]" :slides-per-view="'auto'" :space-between="16" :pagination="{ clickable: true }"
      class="my-8">
      <SwiperSlide v-for="(structure, index) in structures" :key="index" class="max-w-96 h-full">
        <Card :structure="structure" />
      </SwiperSlide>
    </Swiper>
  </section>

</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import type { TrulloType } from '~/types/trullo';

export interface CardsSliderProps {
  title?: string
  structures: Partial<TrulloType>[],
  showMore?: boolean,
  showMorePath?: string
}

const localePath = useLocalePath()

withDefaults(defineProps<CardsSliderProps>(), {
  showMore: false,
  showMorePath: '/trulli'
})

</script>

<style>
.swiper-pagination {
  position: unset;
  display: flex;
  justify-content: end;
  margin-top: 2rem;
  padding-right: 2rem;
}

.swiper-pagination-bullet {
  background-color: #ccc;
  opacity: 0.7;
  transition: all 0.3s;
}

.swiper-pagination-bullet-active {
  background-color: #0A2E36;
  opacity: 1;
}
</style>
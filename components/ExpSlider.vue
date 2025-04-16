<template>
    <section id="experiences" class="py-8 px-8">
        <Paragraph v-if="title" :title="title" titleSize="3xl" :showMoreBtn="showMore"
            :showMorePath="localePath(showMorePath)" />

        <Swiper :modules="[Pagination]" :slides-per-view="'auto'" :space-between="16" :pagination="{ clickable: true }"
            class="my-8">
            <SwiperSlide v-for="(experience, index) in experiences" :key="index" class="max-w-96 h-full">
                <ExpCard :experience="experience" />
            </SwiperSlide>
        </Swiper>
    </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import type { ExperienceType } from '~/types/experience';

const localePath = useLocalePath()

withDefaults(defineProps<{
    title?: string
    experiences: Partial<ExperienceType>[],
    showMore?: boolean,
    showMorePath?: string
}>(), {
    showMore: false,
    showMorePath: '/experiences'
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
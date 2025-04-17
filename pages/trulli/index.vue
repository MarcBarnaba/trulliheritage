<template>
    <Hero :show-travel-bar="p.hero.showTravelBar" :slim="p.hero.slim" :title="p.hero.title" :img-src="p.hero.imgSrc"
        :tagline="p.hero.tagline" />
    <CardsGrid />
</template>

<script setup lang="ts">
import type { HeroProps } from '~/components/Hero.vue';

const route = useRoute()
const { t, locale } = useI18n()
const { data: pageContent, error } = await useAsyncData(`${route.path}_page`, () => {
    return queryCollection(`${locale.value}_pages`).path(`/${locale.value}/pages/trulli`).first();
})
if (error.value) {
    throw createError({
        statusCode: 500
    })
}
const { getComponentProps, hasComponent } = useComponentProps(pageContent.value)

const p = computed(() => ({
    hero: getComponentProps('Hero') as HeroProps,
}))

useSeo({
    title: pageContent.value?.title,
    description: pageContent.value?.description
})
</script>
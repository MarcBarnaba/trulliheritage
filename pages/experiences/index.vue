<template>
    <Hero :show-travel-bar="p.hero.showTravelBar" :slim="p.hero.slim" :title="p.hero.title" :img-src="p.hero.imgSrc"
        :tagline="p.hero.tagline" />
    <ExperiencesGrid />
</template>

<script setup lang="ts">
import type { HeroProps } from '~/components/Hero.vue';

const route = useRoute()
const { t, locale } = useI18n()
const { data: pageContent } = await useAsyncData(`${route.path}_page`, () => {
    return queryCollection(`${locale.value}_pages`).path(`/${locale.value}/pages/experiences`).first();
})
const { getComponentProps, hasComponent } = useComponentProps(pageContent.value)

const p = computed(() => ({
    hero: getComponentProps('Hero') as HeroProps,
}))
</script>
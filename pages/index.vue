<script setup lang="ts">
import type { ButtoonProps } from '~/components/Buttoon.vue';
import type { CardsSliderProps } from '~/components/CardsSlider.vue';
import type { ExpSliderProps } from '~/components/ExpSlider.vue';
import type { HeroProps } from '~/components/Hero.vue';
import type { ParallaxProps } from '~/components/Parallax.vue';
import type { QuoteProps } from '~/components/Quote.vue';
import type { TextImgProps } from '~/components/TextImg.vue';
import { useSeo } from '~/composables/useSeo';


const route = useRoute()
const { t, locale } = useI18n()

const { data: trulli } = await useAsyncData(`${route.path}_trulli`, () => {
  return queryCollection(`${locale.value}_trulli`).all();
}, { lazy: true })

const { data: experiences } = await useAsyncData(`${route.path}_experiences`, () => {
  return queryCollection(`${locale.value}_experiences`).all();
}, { lazy: true })

// Carica i contenuti testuali della pagina
const { data: pageContent, error } = await useAsyncData(`${route.path}_page`, () => {
  return queryCollection(`${locale.value}_pages`).path(`/${locale.value}/pages`).first();
})

if (error.value) {
  throw createError({
    statusCode: 500
  })
}

const { getComponentProps, hasComponent } = useComponentProps(pageContent.value)

const p = computed(() => ({
  hero: getComponentProps('Hero') as HeroProps,
  heroBtn: getComponentProps('HeroButtoon') as ButtoonProps,
  quote: getComponentProps('Quote') as QuoteProps,
  textImg: getComponentProps('TextImg') as TextImgProps,
  cardsSlider: getComponentProps('CardsSlider') as CardsSliderProps,
  parallax: getComponentProps('Parallax') as ParallaxProps,
  expSlider: getComponentProps('ExpSlider') as ExpSliderProps
}))


useSeo({
  title: pageContent.value?.title,
  description: pageContent.value?.description
})
</script>

<template>
  <div>
    <Hero :show-travel-bar="p.hero.showTravelBar" :title="p.hero.title" :tagline="p.hero.tagline"
      :img-src="p.hero.imgSrc">
      <template #btn>
        <Buttoon :color="p.heroBtn.color" :textWhite="p.heroBtn.textWhite" :text="p.heroBtn.text"
          :show-icon="p.heroBtn.showIcon" :url="p.heroBtn.url" class="block md:hidden" />
      </template>
    </Hero>

    <Quote :text="p.quote.text" />

    <TextImg :paragraph="p.textImg.paragraph" :img-path="p.textImg.imgPath" />

    <CardsSlider v-if="trulli" :title="p.cardsSlider.title" :structures="trulli" :show-more="p.cardsSlider.showMore"
      :showMorePath="p.cardsSlider.showMorePath" />

    <Parallax :src="p.parallax.src" height="32rem" :parallaxStrength="p.parallax.parallaxStrength" />

    <ExpSlider v-if="experiences" :title="p.expSlider.title" :experiences="experiences"
      :show-more="p.expSlider.showMore" :showMorePath="p.expSlider.showMorePath" />

    <Contact />

  </div>
</template>

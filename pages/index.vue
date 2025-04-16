<script setup lang="ts">
import type { HeroProps } from '~/components/Hero.vue';


const route = useRoute()
const { t, locale } = useI18n()

const { data: trulli } = await useAsyncData(`${route.path}_trulli`, () => {
  return queryCollection(`${locale.value}_trulli`).all();
})

const { data: experiences } = await useAsyncData(`${route.path}_experiences`, () => {
  return queryCollection(`${locale.value}_experiences`).all();
})

// Carica i contenuti testuali della pagina
const { data: pageContent } = await useAsyncData(`${route.path}_page`, () => {
  return queryCollection(`${locale.value}_pages`).first();
})

const { getComponentProps, getTextImgProps, hasComponent } = useComponentProps(pageContent.value)

const p = computed(() => ({
  hero: getComponentProps('Hero') as HeroProps
}))



</script>

<template>
  <div>
    <Hero :show-travel-bar="true" :title="p.hero.title" :tagline="p.hero.tagline" :img-src="'/global/hero.jpg'">
      <template #btn>
        <Buttoon color="#CBA135" :textWhite="true" :text="'Esplora i Trulli'" :show-icon="true" url="trulli"
          class="block md:hidden" />
      </template>
    </Hero>

    <Quote
      text="TrulliHeritage significa mettere al centro la storia e l’originalità dei trulli, esaltando l’eredità familiare e la cultura locale." />

    <TextImg :paragraph="{
      titleSize: '3xl',
      title: 'Titolo',
      paragraph: 'Alberobello, capitale dei trulli, è molto più di un luogo: è un viaggio nel tempo, dove ogni vicolo racconta storie antiche e ogni angolo rivela un segreto.'
    }" img-path="/global/coni.jpg" />

    <CardsSlider v-if="trulli" title="Trulli" :structures="trulli" :show-more="true" showMorePath="/trulli" />

    <Parallax :src="'/global/vert.jpg'" height="32rem" :parallaxStrength="0.3" />

    <ExpSlider v-if="experiences" title="Vivi la Puglia" :experiences="experiences" :show-more="true"
      showMorePath="/experiences" />

    <Contact />

  </div>
</template>

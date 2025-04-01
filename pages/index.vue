<script setup lang="ts">
import type { HighlightProps } from '~/components/templates/Highlight.vue';

const route = useRoute()
const { t, locale } = useI18n()

const { data: trulli } = await useAsyncData(route.path, () => {
  return queryCollection(locale.value).all();
})

const highlightRows: HighlightProps = {
  rows: [
    {
      imgSrc: '/outside.png',
      invert: false,
      paragraph: {
        title: "Central position", titleSize: "4xl",
        paragraph: "Perfect for a romantic getaway or a peaceful escape"
      }
    },
    {
      imgSrc: '/checkin.png',
      invert: true,
      paragraph: {
        title: "Flexible Check-In Hours", titleSize: "3xl",
        paragraph: "Experience the ease of arriving at your preferred time"
      }
    }
  ]
}

</script>

<template>
  <div>
    <Hero :show-travel-bar="true" :title="t('hero.title')" :tagline="t('hero.tagline')">
      <template #btn>
        <Buttoon color="#CBA135" :textWhite="true" :text="'Esplora i Trulli'" :show-icon="true"
          class="block md:hidden" />
      </template>
    </Hero>

    <Quote
      text="TrulliHeritage significa mettere al centro la storia e l’originalità dei trulli, esaltando l’eredità familiare e la cultura locale." />

    <TextImg :paragraph="{
      titleSize: '3xl',
      title: 'Titolo',
      paragraph: 'Alberobello, capitale dei trulli, è molto più di un luogo: è un viaggio nel tempo, dove ogni vicolo racconta storie antiche e ogni angolo rivela un segreto.'
    }" img-path="/13/ricardo-gomez-angel-jv3kvNBxz5s-unsplash.jpg" />

    <Cards v-if="trulli" :structures="trulli" />

    <!-- <TemplatesHighlight v-bind="highlightRows" /> -->

    <Parallax :src="'/vert.jpg'" height="32rem" :parallaxStrength="0.3" />
    <Contact />

  </div>
</template>

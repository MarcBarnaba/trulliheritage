<script setup lang="ts">

const route = useRoute()
const { t, locale } = useI18n()

const { data: trulli } = await useAsyncData(route.path, () => {
  //TODO: Update collection name and filtering
  return queryCollection(locale.value).all();
})

</script>

<template>
  <div>
    <Hero :show-travel-bar="true" :tagline="t('hero.tagline')">
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
    }" img-path="/13/ricardo-gomez-angel-jv3kvNBxz5s-unsplash.jpg" />

    <CardsSlider v-if="trulli" :structures="trulli" :show-more="true" showMorePath="/trulli" />

    <Parallax :src="'/vert.jpg'" height="32rem" :parallaxStrength="0.3" />
    <Contact />

  </div>
</template>

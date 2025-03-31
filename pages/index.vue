<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()

// Array fittizio per le strutture, da sostituire con dati reali o dinamici
const structures = ref([
  {
    name: 'Trullo dei Nonni',
    shortDescription: 'Tradizione e charme in ogni dettaglio.',
    image: '/13/577082261.jpg'
  },
  {
    name: 'Trullo dell’Amico',
    shortDescription: 'Un’esperienza autentica nel cuore di Alberobello.',
    image: '/13/577082264.jpg'
  },
  {
    name: 'Trullo Heritage',
    shortDescription: 'Un ponte tra passato e presente.',
    image: '/13/PHOTO-2024-05-07-13-40-51 3.jpg'
  }
])

</script>

<template>
  <div>
    <Hero :show-travel-bar="false" :title="t('hero.title')" :tagline="t('hero.tagline')">
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

    <Cards :structures="structures" />

  </div>
</template>

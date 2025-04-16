<template>
    <Hero :show-travel-bar="false" :slim="true" title="Trulli in Valle d'Itria" :img-src="'/global/hero.jpg'"
        tagline="Per un soggiorno indimenticabile tra tradizione pugliese e comfort moderni" />
    <CardsGrid />
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

</script>
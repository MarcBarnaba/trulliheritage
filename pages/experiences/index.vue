<template>
    <Hero :show-travel-bar="false" :slim="true" title="Esperienze in Valle d'Itria"
        tagline="Per un soggiorno indimenticabile tra tradizione pugliese e comfort moderni" />
    <ExperiencesGrid />
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

</script>
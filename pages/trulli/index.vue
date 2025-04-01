<template>
    <Hero :show-travel-bar="false" :slim="true" title="Trulli" tagline="Guardateli un po'" />
    <Cards v-if="trulli" :structures="trulli" />
</template>

<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()

const { data: trulli } = await useAsyncData(route.path, () => {
    return queryCollection(locale.value).all();
})
</script>
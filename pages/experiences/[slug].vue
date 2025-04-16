<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const expSlug = route.params.slug;

const { data: experience } = await useAsyncData(route.path, () => {
    return queryCollection(`${locale.value}_experiences`).where('slug', '=', String(expSlug)).first()
})
</script>

<template>
    <TemplatesExperience v-if="experience" :experience="experience" />
</template>

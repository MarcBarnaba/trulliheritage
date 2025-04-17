<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const expSlug = route.params.slug;

const { data: experience, error } = await useAsyncData(route.path, () => {
    return queryCollection(`${locale.value}_experiences`).where('slug', '=', String(expSlug)).first()
})
if (error.value) {
    throw createError({
        statusCode: 500
    })
}

if (!experience.value) {
    throw createError({
        statusCode: 404
    })
}

useSeo({
    title: experience.value?.title,
    description: experience.value?.description,
    ogImage: experience.value?.coverImage
})
</script>

<template>
    <TemplatesExperience v-if="experience" :experience="experience" />
</template>

<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const trulloSlug = route.params.slug;

const { data: trullo, error } = await useAsyncData(route.path, () => {
    return queryCollection(`${locale.value}_trulli`).where('slug', '=', String(trulloSlug)).first()
})
if (error.value) {
    throw createError({
        statusCode: 500
    })
}

if (!trullo.value) {
    throw createError({
        statusCode: 404
    })
}
</script>

<template>
    <TemplatesTrullo v-if="trullo" :trullo="trullo" />
</template>

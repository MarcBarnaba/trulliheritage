<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const trulloSlug = route.params.slug;

const { data: trullo } = await useAsyncData(route.path, () => {
    return queryCollection(locale.value).where('slug', '=', String(trulloSlug)).first()
})
</script>

<template>
    <TemplatesTrullo v-if="trullo" :trullo="trullo" />
</template>

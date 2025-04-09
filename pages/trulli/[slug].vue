<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const trulloSlug = route.params.slug;

const { data: trullo } = await useAsyncData(route.path, () => {
    //TODO: Update collection name 
    return queryCollection(locale.value).where('slug', '=', String(trulloSlug)).first()
})
</script>

<template>
    <TemplatesTrullo v-if="trullo" :trullo="trullo" />
</template>

<template>
    <div v-for="(row, index) in rows" :key="index" class="flex items-center justify-center w-full py-4">
        <NuxtImg v-if="!row.invert" :src="row.imgSrc" class="px-0 py-8 lg:px-32 lg:py-0" />
        <Paragraph v-bind="row.paragraph">
            <IconsGreen v-if="row.invert" />
            <IconsBlue v-if="!row.invert" />
        </Paragraph>
        <NuxtImg v-if="row.invert" :src="row.imgSrc" class="px-0 py-8 lg:px-32 lg:py-0" />
    </div>
</template>
<script setup lang="ts">
import type { ParagraphProps } from '../Paragraph.vue';

export interface HighlightProps {
    rows: Array<{
        paragraph: ParagraphProps,
        imgSrc: string
        invert?: boolean
    }>
}
defineProps<HighlightProps>()
</script>
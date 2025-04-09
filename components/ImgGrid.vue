<template>
    <div class="w-full relative mb-4">
        <Paragraph :title="t('gallery')" titleSize="2xl" />

        <!-- Image Grid Container -->
        <div ref="gridContainer" :class="[
            'grid grid-cols-1 lg:grid-cols-2 gap-2 transition-all duration-300',
            !expanded && images.length > 4 ? 'max-h-[500px] md:max-h-[600px] overflow-hidden' : ''
        ]">
            <!-- First Column -->
            <div class="col-span-1 flex-col w-full">
                <div v-for="(image, index) in displayedImages.filter((_, i) => i % 4 === 0 || i % 4 === 1)"
                    :key="'col1-' + index" :class="index % 2 === 0 ? 'aspect-w-16' : 'aspect-w-9'"
                    class="overflow-hidden w-full">
                    <NuxtImg :src="image" :alt="`Trullo Img #${index}`" class="object-cover w-full h-full pb-2" />
                </div>
            </div>

            <!-- Second Column -->
            <div class="col-span-1 flex-col w-full">
                <div v-for="(image, index) in displayedImages.filter((_, i) => i % 4 === 2 || i % 4 === 3)"
                    :key="'col2-' + index" :class="index % 2 !== 0 ? 'aspect-w-16' : 'aspect-w-9'"
                    class="overflow-hidden w-full">
                    <NuxtImg :src="image" :alt="`Trullo Img #${index}`" class="object-cover w-full h-full pb-2" />
                </div>
            </div>
        </div>

        <!-- Gradient Overlay when not expanded -->
        <div v-if="!expanded && images.length > 4"
            class="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none">
        </div>

        <!-- Expand/Collapse Button -->
        <div v-if="images.length > 4" class="absolute -bottom-2 left-0 right-0 flex justify-center z-10 mb-2">
            <button @click="toggleExpanded"
                class="flex items-center bg-white border border-gray-300 text-teal-600 hover:text-teal-800 hover:bg-gray-100 py-4 px-4 rounded-full transition shadow-sm">
                <span class="material-icons">{{ expanded ? 'expand_less' : 'expand_more' }}</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    images: Array<string>,
    showMorePath?: string,
}>();

const { t } = useI18n()
const expanded = ref(false);
const gridContainer = ref(null);

const displayedImages = computed(() => {
    return props.images;
});

const toggleExpanded = () => {
    expanded.value = !expanded.value;

    // Scroll to view the grid if it's being collapsed
    if (!expanded.value && gridContainer.value) {
        setTimeout(() => {
            (gridContainer.value as unknown as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
};
</script>

<style scoped>
.aspect-w-16 {
    aspect-ratio: 16 / 9;
}

.aspect-w-9 {
    aspect-ratio: 9 / 16;
}
</style>
<script setup lang="ts">
export interface FeatureListProps {
    title: string
    subtitle: string
    features: Array<{
        icon: string
        imgSrc?: string
        title: string
        description: string
        colSpan?: number  // Per controllare larghezza (1 o 2)
        rowSpan?: number  // Per controllare altezza (1 o 2)
        accent?: boolean  // Per elementi in evidenza
    }>
}

const props = defineProps<FeatureListProps>();

// Utility per determinare le classi di stile basate sui parametri di span
const getGridClass = (feature: any) => {
    const classes = ['relative overflow-hidden transition-all duration-300 hover:transform hover:scale-102'];

    // Aggiungi classi per il colSpan (default: 1)
    if (feature.colSpan === 2) {
        classes.push('md:col-span-2');
    } else {
        classes.push('md:col-span-1');
    }

    // Aggiungi classi per il rowSpan (default: 1)
    if (feature.rowSpan === 2) {
        classes.push('md:row-span-2');
    } else {
        classes.push('md:row-span-1');
    }

    // Stili per elementi in accent vs normali
    if (feature.accent) {
        classes.push('bg-olive-100 text-olive-800');
    } else {
        classes.push('bg-white text-stone-900');
    }

    return classes.join(' ');
};

// Calcola la dimensione dell'icona in base al rowSpan
const getIconSize = (feature: any) => {
    return feature.rowSpan === 2 ? 'text-5xl mb-6' : 'text-3xl mb-4';
};
</script>

<template>
    <section class="py-8 px-8">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-semibold text-stone-900 mb-3">{{ title }}</h2>
                <p v-if="subtitle" class="text-lg text-stone-600 max-w-3xl mx-auto">{{ subtitle }}</p>
            </div>

            <!-- Bento Grid Layout -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
                <div v-for="(feature, index) in features" :key="index" :class="getGridClass(feature)"
                    class="p-6 rounded-xl shadow-md group">

                    <!-- Icona -->
                    <div :class="['text-olive-600', getIconSize(feature)]">
                        <span v-if="feature.icon">{{ feature.icon }}</span>
                        <img v-else-if="feature.imgSrc" :src="feature.imgSrc" :alt="feature.title"
                            class="w-auto h-full mx-auto mb-2">
                    </div>

                    <!-- Contenuto -->
                    <h3 :class="[
                        'font-medium mb-2',
                        feature.rowSpan === 2 ? 'text-2xl' : 'text-xl'
                    ]">{{ feature.title }}</h3>

                    <p :class="[
                        feature.accent ? 'text-olive-700' : 'text-stone-600',
                        feature.rowSpan === 2 ? 'text-lg' : 'text-base'
                    ]">{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Hover effect enhancement */
.hover\:scale-102:hover {
    transform: scale(1.02);
}
</style>
<template>
    <div class="relative w-full h-96 overflow-hidden" ref="parallaxWrapper">
        <div ref="parallaxContainer" class="absolute inset-0 w-full h-full" :style="{
            backgroundImage: `url(${src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            transform: `translateY(${offsetY}px) scale(1.2)`
        }"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Props
interface Props {
    src: string;
    height?: string; // Opzionale per controllare l'altezza
    parallaxStrength?: number; // Forza dell'effetto parallax
}

const props = withDefaults(defineProps<Props>(), {
    height: '24rem', // default a 24rem (equivalente a h-96)
    parallaxStrength: 0.15 // valore moderato per default
});

// Refs
const parallaxWrapper = ref<HTMLDivElement | null>(null);
const parallaxContainer = ref<HTMLDivElement | null>(null);
const offsetY = ref(0);
const isVisible = ref(false);

// Funzione per controllare se l'elemento è visibile nella viewport
const checkVisibility = () => {
    if (!parallaxWrapper.value) return false;

    const rect = parallaxWrapper.value.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    // Elemento è visibile se è anche parzialmente nella viewport
    return (rect.top < viewHeight && rect.bottom > 0);
};

// Funzione per calcolare l'offset parallax in modo limitato
const calculateParallaxOffset = () => {
    if (!parallaxWrapper.value || !isVisible.value) return;

    const rect = parallaxWrapper.value.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    // Calcola quanto è visibile l'elemento nella viewport (da 0 a 1)
    const visiblePercentage = (Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0)) / rect.height;

    // Calcola la posizione relativa nel viewport (da -1 a 1, dove 0 è il centro)
    const viewportPosition = (rect.top + rect.height / 2 - viewHeight / 2) / (viewHeight / 2);

    // Calcola l'offset con un limite per evitare che l'immagine esca
    // Moltiplichiamo per la forza del parallax e limitiamo il movimento
    const maxOffset = rect.height * 0.2; // 20% dell'altezza come limite
    offsetY.value = -viewportPosition * props.parallaxStrength * maxOffset;
};

// Gestore dello scroll
const handleScroll = () => {
    isVisible.value = checkVisibility();
    if (isVisible.value) {
        calculateParallaxOffset();
    }
};

// Stile calcolato per l'altezza
const wrapperStyle = computed(() => ({
    height: props.height
}));

// Aggiungi e rimuovi event listener per lo scroll
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    // Esegui una volta all'inizio
    handleScroll();

    // Aggiungi anche un listener per il resize
    window.addEventListener('resize', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleScroll);
});
</script>
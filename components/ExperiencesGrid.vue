<template>
    <div class="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-16 px-4 md:px-8">
        <ExpCard v-for="experience in experiences" :key="experience.slug" :experience="experience" />
    </div>
</template>

<script setup lang="ts">
import type { ExperienceType } from '~/types/experience';

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();
const isLoading = ref(true);
const experiences = ref<Partial<ExperienceType>[]>([]);

const fetchExperiences = async () => {
    isLoading.value = true;
    experiences.value = []; // Resetta i risultati

    try {
        const { data: exps } = await useAsyncData(`${route.path}-${JSON.stringify(route.query)}`, () => {
            return queryCollection(`${locale.value}_experiences`).all();
        });

        experiences.value = exps.value || [];

    } catch (error) {
        console.error('Errore nel caricamento delle exp:', error);
        experiences.value = [];
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    await fetchExperiences();
});
</script>
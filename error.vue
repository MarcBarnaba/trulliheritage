<template>
    <NuxtLayout>
        <Hero :show-travel-bar="false" :slim="true" tagline="" :img-src="'/global/gate.jpg'" />
        <div class="flex flex-col items-center justify-center min-h-96 px-4 py-12 bg-white">
            <div class="text-center">
                <!-- Status code -->
                <p v-if="error?.statusCode" class="text-sm font-medium text-gray-500">{{ error?.statusCode }}</p>

                <!-- Main error message -->
                <h1 v-if="error?.statusMessage"
                    class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    {{ error?.statusMessage }}
                </h1>
                <!-- Subtitle / Description -->
                <p class="mt-4 text-base text-gray-600 max-w-md mx-auto">
                    {{ errorMessage }}
                </p>

                <!-- Button to go back home -->
                <div class="mt-8">
                    <Buttoon text="Home" url="/" color="#CBA135" :text-white="true" :show-icon="true" />
                </div>
            </div>
        </div>
    </NuxtLayout>

</template>

<script setup lang="ts">
defineProps<{
    error?: {
        statusCode?: number;
        statusMessage?: string;
    }
}>();

// Customize error message based on status code
const errorMessage = computed(() => {
    switch (error.value?.statusCode) {
        case 400:
            return t('error.400');
        case 401:
            return t('error.401');
        case 403:
            return t('error.403');
        case 404:
            return t('error.404');
        case 500:
            return t('error.500');
        default:
            return t('error.unknown');
    }
});

const error = useError();
const { t } = useI18n();

// Head metadata
useHead({
    title: `${t('error.error')} | ${t('trulliHeritage')}`,
    meta: [
        {
            name: 'description',
            content: `${t('error.error')} - ${error.value?.statusMessage}`
        }
    ]
});
</script>
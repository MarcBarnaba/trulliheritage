<template>
    <div class="container mx-auto py-16 px-4 md:px-8">
        <div class="flex flex-col lg:flex-row gap-8">
            <!-- Filtri interattivi sulla sinistra -->
            <div class="w-full lg:w-1/4 bg-white p-6 rounded shadow-md h-fit">
                <h3 class="text-xl font-semibold mb-4">{{ t('filters') }}</h3>

                <div class="space-y-6">
                    <!-- Date picker per check-in -->
                    <div class="border-b pb-4">
                        <label for="checkin" class="block font-medium text-gray-700 mb-1">Check-in</label>
                        <input type="date" id="checkin" v-model="filters.checkin"
                            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            @change="applyFilters">
                    </div>

                    <!-- Date picker per check-out -->
                    <div class="border-b pb-4">
                        <label for="checkout" class="block font-medium text-gray-700 mb-1">Check-out</label>
                        <input type="date" id="checkout" v-model="filters.checkout"
                            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            @change="applyFilters">
                    </div>

                    <!-- Selettore per numero di ospiti -->
                    <div class="border-b pb-4">
                        <label for="adults" class="block font-medium text-gray-700 mb-1">{{ t('guests') }}</label>
                        <div class="flex items-center">
                            <button @click="decrementGuests"
                                class="p-2 bg-gray-100 rounded-l border border-gray-300 hover:bg-gray-200"
                                :disabled="filters.adults <= 1">
                                <span class="material-icons text-sm">remove</span>
                            </button>
                            <input type="number" id="adults" v-model.number="filters.adults" min="1" max="20"
                                class="w-full p-2 text-center border-t border-b border-gray-300 focus:outline-none"
                                @change="applyFilters">
                            <button @click="incrementGuests"
                                class="p-2 bg-gray-100 rounded-r border border-gray-300 hover:bg-gray-200">
                                <span class="material-icons text-sm">add</span>
                            </button>
                        </div>
                    </div>

                    <!-- Filtri aggiuntivi -->
                    <div class="border-b pb-4">
                        <label class="block font-medium text-gray-700 mb-1">{{ t('services') }}</label>
                        <div class="space-y-2 mt-2">
                            <div class="flex items-center">
                                <input type="checkbox" id="pool" v-model="filters.amenities.pool" @change="applyFilters"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="pool" class="ml-2 text-gray-700">{{ t('pool') }}</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="wifi" v-model="filters.amenities.wifi" @change="applyFilters"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="wifi" class="ml-2 text-gray-700">{{ t('wifi') }}</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="ac" v-model="filters.amenities.ac" @change="applyFilters"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="ac" class="ml-2 text-gray-700">{{ t('airConditioning') }}</label>
                            </div>
                            <div class="flex items-center">
                                <input type="checkbox" id="pets" v-model="filters.amenities.pets" @change="applyFilters"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                                <label for="pets" class="ml-2 text-gray-700">{{ t('animalsAdmitted') }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Filtro prezzo -->
                    <!-- <div class="pb-4">
                        <label for="price" class="block font-medium text-gray-700 mb-1">Prezzo massimo (€/notte)</label>
                        <input type="range" id="price" v-model.number="filters.maxPrice" min="50" max="500" step="10"
                            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            @change="applyFilters">
                        <div class="flex justify-between mt-1">
                            <span class="text-xs text-gray-500">€50</span>
                            <span class="text-sm font-medium">€{{ filters.maxPrice }}</span>
                            <span class="text-xs text-gray-500">€500</span>
                        </div>
                    </div> -->

                    <!-- Pulsanti di azione -->
                    <div class="flex gap-2">
                        <button @click="resetFilters"
                            class="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200">
                            {{ t('reset') }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Risultati sulla destra -->
            <div class="w-full lg:w-3/4">
                <div v-if="isLoading" class="flex justify-center items-center h-64">
                    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>

                <div v-else-if="filteredStructures.length > 0" class="grid grid-cols-1 md:grid-cols-2  gap-6">
                    <Card v-for="(structure, index) in filteredStructures" :key="index" :structure="structure" />
                </div>

                <div v-else class="bg-white p-8 rounded shadow text-center">
                    <span class="material-icons text-4xl text-gray-400 mb-4">search_off</span>
                    <h3 class="text-xl font-semibold mb-2">{{ t('noResult') }}</h3>
                    <p class="text-gray-600">{{ t('noResultHelpText') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TrulloType } from '~/types/trullo';

interface FilterableAmenities {
    pool: boolean;
    wifi: boolean;
    ac: boolean;
    pets: boolean;
    [key: string]: boolean;
}

interface Filters {
    checkin: string;
    checkout: string;
    adults: number;
    amenities: FilterableAmenities;
    maxPrice?: number;
}

const route = useRoute();
const router = useRouter();
const { t, locale } = useI18n();

const allStructures = ref<Partial<TrulloType>[]>([]);
const isLoading = ref(true);

const filters = reactive<Filters>({
    checkin: '',
    checkout: '',
    adults: 1,
    amenities: {
        pool: false,
        wifi: false,
        ac: false,
        pets: false
    },
});

const extractSearchParams = () => {
    if (route.query.checkin) filters.checkin = route.query.checkin as string;
    if (route.query.checkout) filters.checkout = route.query.checkout as string;
    if (route.query.adults) filters.adults = Number(route.query.adults);

    // Estrazione parametri opzionali
    if (route.query.pool) filters.amenities.pool = route.query.pool === 'true';
    if (route.query.wifi) filters.amenities.wifi = route.query.wifi === 'true';
    if (route.query.ac) filters.amenities.ac = route.query.ac === 'true';
    if (route.query.pets) filters.amenities.pets = route.query.pets === 'true';
    if (route.query.maxPrice) filters.maxPrice = Number(route.query.maxPrice);
};

const filteredStructures = computed(() => {
    return allStructures.value.filter(structure => {
        // TODO: Filter
        // Filtro per numero di ospiti
        // if (filters.adults > (structure.maxGuests || 0)) return false;

        // Filtro per prezzo
        // if ((structure.price || 0) > filters.maxPrice) return false;


        // Filtro per amenities
        // const structureAmenities = structure.amenities || [];
        // const amenityIcons = structureAmenities.map(a => a.icon);

        // if (filters.amenities.pool && !amenityIcons.includes('pool')) return false;
        // if (filters.amenities.wifi && !amenityIcons.includes('wifi')) return false;
        // if (filters.amenities.ac && !amenityIcons.includes('ac_unit')) return false;
        // if (filters.amenities.pets && !amenityIcons.includes('pets')) return false;

        return true;
    });
});

const incrementGuests = () => {
    filters.adults++;
    applyFilters();
};

const decrementGuests = () => {
    if (filters.adults > 1) {
        filters.adults--;
        applyFilters();
    }
};

const resetFilters = () => {
    filters.checkin = '';
    filters.checkout = '';
    filters.adults = 1;
    filters.maxPrice = 500;
    Object.keys(filters.amenities).forEach(key => {
        filters.amenities[key as keyof FilterableAmenities] = false;
    });
    applyFilters();
};

// Applica i filtri e aggiorna l'URL
const applyFilters = () => {
    const query: Record<string, string> = {};

    // Aggiungi solo i parametri valorizzati
    if (filters.checkin) query.checkin = filters.checkin;
    if (filters.checkout) query.checkout = filters.checkout;
    query.adults = filters.adults.toString();

    // Aggiungi amenities solo se selezionate
    if (filters.amenities.pool) query.pool = 'true';
    if (filters.amenities.wifi) query.wifi = 'true';
    if (filters.amenities.ac) query.ac = 'true';
    if (filters.amenities.pets) query.pets = 'true';

    // Aggiungi prezzo massimo solo se diverso dal default
    if (filters.maxPrice && filters.maxPrice !== 500) query.maxPrice = filters.maxPrice.toString();

    // Aggiorna l'URL senza ricaricare la pagina
    router.replace({ query });

    fetchTrulli();
};

const fetchTrulli = async () => {
    isLoading.value = true;
    try {
        const { data: trulli } = await useAsyncData(route.path, () => {
            return queryCollection(`${locale.value}_trulli`).all();
        })
        allStructures.value = trulli.value || [];

    } catch (error) {
        console.error('Errore nel caricamento dei trulli:', error);
        allStructures.value = [];
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    extractSearchParams();
    fetchTrulli();
});

watch(() => route.query, () => {
    extractSearchParams();
    fetchTrulli();
}, { deep: true });
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
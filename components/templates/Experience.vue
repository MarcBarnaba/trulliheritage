<template>
    <div class="">
        <!-- Hero Slim Section -->
        <section class="relative h-64 md:h-80 overflow-hidden">
            <img :src="experience?.coverImage || '/api/placeholder/1200/400'" alt="Experience Cover Image"
                class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            <div class="absolute bottom-0 left-0 w-full p-8 text-white">
                <div class="container">
                    <h1 class="text-3xl md:text-4xl font-bold">{{ experience?.title }}</h1>
                    <div class="flex items-center mt-2">
                        <span v-if="experience?.reviews?.length" class="flex items-center">
                            <span class="material-icons text-amber-400 text-sm">star</span>
                            <span class="ml-1">{{ getAverageRating(experience.reviews) }}</span>
                            <span class="mx-1">·</span>
                            <span>{{ experience?.reviews.length }} {{ experience?.reviews.length === 1 ? 'recensione' :
                                'recensioni' }}</span>
                        </span>
                        <span v-if="experience?.reviews?.length" class="mx-3">|</span>
                        <span class="flex items-center">
                            <span class="material-icons text-white text-sm">location_on</span>
                            <span class="ml-1">{{ experience?.location }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <Paragraph align="left" title="Descrizione" :paragraph="experience?.description" title-size="2xl">
            <template #default>
                <IconsMint />
            </template>
        </Paragraph>

        <!-- <ImgGrid v-if="experience?.images?.length" :images="experience.images" class="py-8" /> -->

        <div class="w-full px-8 pb-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Colonna sinistra: Dettagli e info principali -->
                <div class="lg:col-span-2">
                    <!-- Caratteristiche dell'Esperienza -->
                    <section>
                        <h2 class="text-2xl font-semibold mb-6">Caratteristiche</h2>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <!-- Info principali -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">Informazioni</h3>
                                <ul class="space-y-3">
                                    <li class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">schedule</span>
                                        <span>Durata: {{ experience?.duration }}</span>
                                    </li>
                                    <li class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">groups</span>
                                        <span>Max {{ experience?.maxParticipants }} partecipanti</span>
                                    </li>
                                    <li class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">translate</span>
                                        <div class="flex flex-wrap gap-2">
                                            <span v-for="(lang, index) in experience.languages" :key="`lang-${index}`"
                                                class="px-2 py-1 bg-gray-100 rounded-full text-sm uppercase">
                                                {{ lang }}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <!-- Cosa è incluso -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">Incluso</h3>
                                <ul class="space-y-3">
                                    <li v-for="(item, index) in experience?.included" :key="`included-${index}`"
                                        class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">check_circle</span>
                                        <span>{{ item }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Cosa portare -->
                            <div v-if="experience?.whatToBring?.length" class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">Cosa portare</h3>
                                <ul class="space-y-3">
                                    <li v-for="(item, index) in experience.whatToBring" :key="`bring-${index}`"
                                        class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">luggage</span>
                                        <span>{{ item }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>



                    <!-- Testimonials Section -->
                    <section v-if="experience?.reviews?.length" class="mb-8">
                        <h3 class="text-xl font-semibold mb-4">Recensioni</h3>
                        <div class="mt-6 grid md:grid-cols-2 gap-6">
                            <div v-for="(review, index) in experience.reviews" :key="`review-${index}`"
                                class="bg-white p-6 rounded-lg shadow-md">
                                <div class="flex justify-between items-start mb-3">
                                    <h4 class="font-bold">{{ review.name }}</h4>
                                    <div class="flex">
                                        <span v-for="star in 5" :key="star" class="material-icons text-sm"
                                            :class="star <= review.rating ? 'text-yellow-500' : 'text-gray-300'">
                                            star
                                        </span>
                                    </div>
                                </div>
                                <p class="text-gray-600 italic">"{{ review.text }}"</p>
                                <p v-if="review.date" class="mt-2 text-sm text-gray-500">{{ formatDate(review.date) }}
                                </p>
                            </div>
                        </div>
                    </section>

                    <!-- Mappa della posizione -->
                    <div v-if="experience?.mapsSrc" class="mb-8">
                        <h3 class="text-xl font-semibold mb-4">{{ t('position') }}</h3>
                        <iframe id="map" :src="experience.mapsSrc" width="100%" height="300" style="border: 0"
                            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

                    </div>
                </div>

                <!-- Colonna destra: Contatto host -->
                <div>
                    <!-- Componente contatto host -->
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-[100px]">
                        <div class="flex items-baseline justify-between mb-4">
                            <span class="text-2xl font-bold text-emerald-600">€{{ experience?.price }}</span>
                            <span class="text-gray-600">a persona</span>
                        </div>

                        <!-- Info host -->
                        <div class="border-t border-b py-4 my-4">
                            <h3 class="text-lg font-medium mb-3">Il tuo host</h3>
                            <div class="flex items-center mb-4">
                                <img :src="experience?.host.avatar || 'https://avatar.iran.liara.run/public/5'"
                                    :alt="experience?.host.name" class="w-12 h-12 rounded-full mr-3" />
                                <div>
                                    <p class="font-medium">{{ experience?.host.name }}</p>
                                    <p class="text-sm text-gray-600">Host esperienza</p>
                                </div>
                            </div>
                            <p class="text-gray-700 text-sm">{{ experience?.host.description }}</p>
                        </div>

                        <!-- Form contatto -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium mb-1">Data desiderata</label>
                            <input type="date" class="w-full border rounded p-2 mb-3" v-model="desiredDate" />

                            <label class="block text-sm font-medium mb-1">Numero partecipanti</label>
                            <select class="w-full border rounded p-2 mb-3" v-model="participants">
                                <option v-for="i in experience?.maxParticipants || 1" :key="i" :value="i">
                                    {{ i }} {{ i === 1 ? 'partecipante' : 'partecipanti' }}
                                </option>
                            </select>

                            <label class="block text-sm font-medium mb-1">Note aggiuntive</label>
                            <textarea class="w-full border rounded p-2 mb-3" rows="3" v-model="notes"></textarea>
                        </div>

                        <a :href="getWhatsAppLink()" target="_blank"
                            class="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition">
                            <span class="material-icons mr-2">chat</span>
                            Contatta l'host via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ExperienceType } from '~/types/experience';

const { t } = useI18n();

const props = defineProps<{
    experience: ExperienceType
}>();

// Stati per form di contatto
const desiredDate = ref(new Date().toISOString().split('T')[0]);
const participants = ref('2');
const notes = ref('');

// Calcola media recensioni
const getAverageRating = (reviews: { rating: number }[]) => {
    if (!reviews?.length) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
};

// Formatta data
const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('it-IT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    } catch (e) {
        return dateString;
    }
};

// Link WhatsApp
const getWhatsAppLink = () => {
    // Assumiamo un numero di contatto predefinito (potresti volerlo aggiungere allo schema dell'host)
    const hostPhone = '39XXXXXXXXXX'; // Sostituisci con il numero effettivo o aggiungi al modello
    const message = encodeURIComponent(
        `Ciao ${props.experience.host.name}, sono interessato alla tua esperienza "${props.experience.title}" ` +
        `per il giorno ${desiredDate.value} con ${participants.value} partecipanti. ${notes.value ? 'Note: ' + notes.value : ''}`
    );
    return `https://wa.me/${hostPhone}?text=${message}`;
};
</script>
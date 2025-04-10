<template>
    <div class="">
        <!-- Hero Slim Section -->
        <section class="relative h-64 md:h-80 overflow-hidden">
            <img :src="trullo?.coverImage || '/api/placeholder/1200/400'" alt="Trullo"
                class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            <div class="absolute bottom-0 left-0 w-full p-8 text-white">
                <div class="container">
                    <h1 class="text-3xl md:text-4xl font-bold">{{ trullo?.name }}</h1>
                    <div class="flex items-center mt-2">
                        <span class="flex items-center">
                            <span class="material-icons text-amber-400 text-sm">star</span>
                            <span class="ml-1">{{ trullo?.rating }}</span>
                            <span class="mx-1">·</span>
                            <span>{{ trullo?.reviewsCount }} {{ t('reviews') }}</span>
                        </span>
                        <span class="mx-3">|</span>
                        <span class="flex items-center">
                            <span class="material-icons text-white text-sm">location_on</span>
                            <span class="ml-1">{{ trullo?.location }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <Paragraph align="left" :title="t('description')" :paragraph="trullo?.description" title-size="2xl">
            <template #default>
                <IconsMint />
            </template>
        </Paragraph>

        <ImgGrid :images="[...trullo?.images ?? [], ...trullo?.images ?? []]" class="py-8" />

        <div class="container mx-auto px-8 pb-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Colonna sinistra: Dettagli e info principali -->
                <div class="lg:col-span-2">
                    <!-- Caratteristiche del Trullo -->
                    <section>
                        <h2 class="text-2xl font-semibold mb-6">{{ t('features') }}</h2>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <!-- Info per la notte -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">{{ t('nightInfo') }}</h3>
                                <ul class="space-y-3">
                                    <li v-for="(info, index) in trullo?.nightInfo" :key="`night-${index}`"
                                        class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">{{ info.icon }}</span>
                                        <span>{{ info.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Servizi -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">{{ t('services') }}</h3>
                                <ul class="space-y-3">
                                    <li v-for="(service, index) in trullo?.services" :key="`service-${index}`"
                                        class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">{{ service.icon }}</span>
                                        <span>{{ service.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Amenities -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">{{ t('amenities') }}</h3>
                                <ul class="space-y-3">
                                    <li v-for="(amenity, index) in trullo?.amenities" :key="`amenity-${index}`"
                                        class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">{{ amenity.icon }}</span>
                                        <span>{{ amenity.text }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Info e Regole -->
                    <section>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <!-- Regole della struttura -->
                            <div>
                                <h3 class="text-xl font-semibold mb-4">{{ t('rules') }}</h3>
                                <ul class="space-y-2">
                                    <li v-for="(rule, index) in trullo?.rules" :key="`rule-${index}`"
                                        class="flex items-start">
                                        <span class="material-icons text-gray-600 mr-2 mt-0.5">{{ rule.allowed ?
                                            'check_circle' : 'cancel' }}</span>
                                        <span>{{ rule.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Info utili -->
                            <div>
                                <h3 class="text-xl font-semibold mb-4">{{ t('usefulInfo') }}</h3>
                                <ul class="space-y-2">
                                    <li v-for="(info, index) in trullo?.usefulInfo" :key="`info-${index}`"
                                        class="flex items-start">
                                        <span class="material-icons text-gray-600 mr-2 mt-0.5">info</span>
                                        <span>{{ info.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Informazioni sulla proprietà -->
                            <div class="col-span-full">
                                <h3 class="text-xl font-semibold mb-4">{{ t('propertyInfo') }}</h3>
                                <div class="flex items-center mb-4">
                                    <img :src="trullo?.owner.avatar || 'https://avatar.iran.liara.run/public/5'"
                                        :alt="t('host')" class="w-12 h-12 rounded-full mr-3" />

                                    <div>
                                        <p class="font-medium">{{ trullo?.owner.name }}</p>
                                        <p class="text-sm text-gray-600">{{ t('host') }} {{ trullo?.owner.since }}</p>
                                    </div>
                                </div>
                                <p class="text-gray-700">{{ trullo?.owner.description }}</p>
                            </div>
                        </div>

                        <div class="mb-8">
                            <h3 class="text-xl font-semibold mb-4">{{ t('position') }}</h3>
                            <iframe id="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0707191003435!2d17.2366536!3d40.7824594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347b3baf5481343%3A0x13161602c736d938!2sAL%2013!5e0!3m2!1sit!2sit!4v1727632422216!5m2!1sit!2sit"
                                width="100%" height="300" style="border: 0" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>

                        </div>

                        <!-- Testimonials Section -->
                        <section class="container mx-auto">
                            <h3 class="text-xl font-semibold mb-4">{{ t('testimonials') }}</h3>
                            <div class="mt-6 grid md:grid-cols-3 gap-6">
                                <div v-for="(testimonial, index) in trullo?.testimonials" :key="`testimonial-${index}`"
                                    class="bg-white p-6 rounded-lg shadow-md">
                                    <p class="text-gray-600 italic">"{{ testimonial.text }}"</p>
                                    <h4 class="mt-4 font-bold">- {{ testimonial.name }}</h4>
                                </div>
                            </div>
                        </section>

                    </section>
                </div>

                <!-- Colonna destra: Verifica disponibilità e contatto host -->
                <div>
                    <!-- Componente verifica disponibilità e contatto host -->
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-[100px]">
                        <!-- <div v-if="trullo?.pricePerNight" class="flex items-baseline justify-between mb-4">
                            <span class="text-2xl font-bold">€{{ trullo?.pricePerNight }}</span>
                            <span class="text-gray-600">a notte</span>
                        </div> -->

                        <div class="border rounded-lg overflow-hidden mb-4">
                            <div class="grid grid-cols-2">
                                <div class="p-3 border-r border-b">
                                    <label class="block text-xs text-gray-600 mb-1">CHECK-IN</label>
                                    <input type="date" class="w-full border-none p-0 focus:ring-0" v-model="checkIn" />
                                </div>
                                <div class="p-3 border-b">
                                    <label class="block text-xs text-gray-600 mb-1">CHECK-OUT</label>
                                    <input type="date" class="w-full border-none p-0 focus:ring-0" v-model="checkOut" />
                                </div>
                                <div class="p-3 border-r col-span-2">
                                    <label class="block text-xs text-gray-600 mb-1">OSPITI</label>
                                    <select class="w-full border-none p-0 focus:ring-0" v-model="guests">
                                        <option v-for="i in trullo?.maxGuests || 1" :key="i" :value="i">
                                            {{ i }} {{ i === 1 ? 'ospite' : 'ospiti' }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Availability Check Result Alert -->
                        <div v-if="availabilityResult" :class="[
                            'p-4 mb-4 rounded-lg flex items-start',
                            availabilityResult.available
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                        ]">
                            <span class="material-icons mr-2">
                                {{ availabilityResult.available ? 'check_circle' : 'error' }}
                            </span>
                            <div>
                                <p class="font-medium">{{ availabilityResult.message }}</p>
                            </div>
                        </div>

                        <button
                            class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition mb-3"
                            @click="checkAvailability" :disabled="isLoading">
                            {{ isLoading ? t('checkLoading') : t('checkAvailability.btnLabel') }}</button>

                        <a :href="getWhatsAppLink()" target="_blank"
                            class="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-black py-3 rounded-lg font-medium transition">
                            <span class="material-icons mr-2">call</span>
                            {{ t('contactHost') }} </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AvailabilityResult } from '~/server/api/checkAvailability.post';
import type { TrulloType } from '~/types/trullo';

const { t } = useI18n()

const props = defineProps<{
    trullo: TrulloType
}>();

// Stato per form di contatto
const checkIn = ref(new Date().toISOString().split('T')[0]);
const checkOut = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
const guests = ref('2');
const showAlternatives = ref(true); //TODO: Dead or alive

const availabilityResult = ref<AvailabilityResult | null | undefined>(null);
const isLoading = ref(false);



const checkAvailability = async () => {
    isLoading.value = true;

    try {
        const { data, error } = await useFetch('/api/checkAvailability', {
            method: 'POST',
            body: {
                checkIn: checkIn.value,
                checkOut: checkOut.value,
                guests: guests.value,
                trullo: {
                    slug: props.trullo.slug
                },
                findAlternatives: showAlternatives.value
            }
        });

        if (error.value) {
            throw error.value;
        }

        if (!data.value?.body.available && data.value?.body.message) {
            console.info(`Struttura non disponibile. Message: ${data.value?.body.message}`)
        }

        if (data.value?.body.alternativeDates) {
            console.info(`Alternative dates: ${data.value?.body.alternativeDates.checkIn} - ${data.value?.body.alternativeDates.checkOut}`)
        }

        availabilityResult.value = {
            available: data.value?.body.available ?? false,
            message: data.value?.body.available
                ? t('checkAvailability.success')
                : t('checkAvailability.failure')
        };
    } catch (error) {
        console.error('Errore durante la verifica della disponibilità:', error);
        availabilityResult.value = {
            available: false,
            message: t('checkAvailability.error')
        };
    } finally {
        isLoading.value = false;
    }
};

const getWhatsAppLink = () => {
    const message = encodeURIComponent(
        `Ciao ${props.trullo.owner.name}, sono interessato al tuo "${props.trullo.name}" ` +
        `dal ${checkIn.value} al ${checkOut.value} per ${guests.value} ospiti. È disponibile?`
    );
    return `https://wa.me/${props.trullo.owner.phone.replace(/\+/g, '')}?text=${message}`;
};
</script>
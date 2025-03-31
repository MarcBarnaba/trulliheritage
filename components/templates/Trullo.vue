<template>
    <div class="">
        <!-- Hero Slim Section -->
        <section class="relative h-64 md:h-80 overflow-hidden">
            <img :src="trullo.coverImage || '/api/placeholder/1200/400'" alt="Vista del trullo"
                class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
            <div class="absolute bottom-0 left-0 w-full p-8 text-white">
                <div class="container">
                    <h1 class="text-3xl md:text-4xl font-bold">{{ trullo.name }}</h1>
                    <div class="flex items-center mt-2">
                        <span class="flex items-center">
                            <span class="material-icons text-amber-400 text-sm">star</span>
                            <span class="ml-1">{{ trullo.rating }}</span>
                            <span class="mx-1">·</span>
                            <span>{{ trullo.reviewsCount }} recensioni</span>
                        </span>
                        <span class="mx-3">|</span>
                        <span class="flex items-center">
                            <span class="material-icons text-white text-sm">location_on</span>
                            <span class="ml-1">{{ trullo.location }}</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Descrizione (usando il componente Paragraph) -->
        <Paragraph align="left" :title="'Descrizione'" :paragraph="trullo.description" title-size="2xl">
            <template #default>
                <IconsMint />
            </template>
        </Paragraph>


        <!-- ImageGrid Component (Fullwidth) -->
        <ImageGrid :images="trullo.images" class="py-8" />

        <div class="container mx-auto px-8 pb-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Colonna sinistra: Dettagli e info principali -->
                <div class="lg:col-span-2">
                    <!-- Caratteristiche del Trullo -->
                    <section>
                        <h2 class="text-2xl font-semibold mb-6">Caratteristiche del trullo</h2>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <!-- Info per la notte -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">Info per la notte</h3>
                                <ul class="space-y-3">
                                    <li v-for="(info, index) in trullo.nightInfo" :key="`night-${index}`"
                                        class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">{{ info.icon }}</span>
                                        <span>{{ info.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Servizi -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">Servizi</h3>
                                <ul class="space-y-3">
                                    <li v-for="(service, index) in trullo.services" :key="`service-${index}`"
                                        class="flex items-center">
                                        <span class="material-icons text-gray-600 mr-2">{{ service.icon }}</span>
                                        <span>{{ service.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Amenities -->
                            <div class="border rounded-lg p-4">
                                <h3 class="text-lg font-medium mb-4">Amenities</h3>
                                <ul class="space-y-3">
                                    <li v-for="(amenity, index) in trullo.amenities" :key="`amenity-${index}`"
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
                                <h3 class="text-xl font-semibold mb-4">Regole della struttura</h3>
                                <ul class="space-y-2">
                                    <li v-for="(rule, index) in trullo.rules" :key="`rule-${index}`"
                                        class="flex items-start">
                                        <span class="material-icons text-gray-600 mr-2 mt-0.5">{{ rule.allowed ?
                                            'check_circle' : 'cancel' }}</span>
                                        <span>{{ rule.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Info utili -->
                            <div>
                                <h3 class="text-xl font-semibold mb-4">Info utili</h3>
                                <ul class="space-y-2">
                                    <li v-for="(info, index) in trullo.usefulInfo" :key="`info-${index}`"
                                        class="flex items-start">
                                        <span class="material-icons text-gray-600 mr-2 mt-0.5">info</span>
                                        <span>{{ info.text }}</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Informazioni sulla proprietà -->
                            <div class="col-span-full">
                                <h3 class="text-xl font-semibold mb-4">Informazioni sulla proprietà</h3>
                                <div class="flex items-center mb-4">
                                    <img :src="trullo.owner.avatar || 'https://avatar.iran.liara.run/public/5'"
                                        alt="Proprietario" class="w-12 h-12 rounded-full mr-3" />

                                    <div>
                                        <p class="font-medium">{{ trullo.owner.name }}</p>
                                        <p class="text-sm text-gray-600">Proprietario dal {{ trullo.owner.since }}</p>
                                    </div>
                                </div>
                                <p class="text-gray-700">{{ trullo.owner.description }}</p>
                            </div>
                        </div>

                        <div class="mb-8">
                            <h3 class="text-xl font-semibold mb-4">Posizione</h3>
                            <iframe id="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.0707191003435!2d17.2366536!3d40.7824594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1347b3baf5481343%3A0x13161602c736d938!2sAL%2013!5e0!3m2!1sit!2sit!4v1727632422216!5m2!1sit!2sit"
                                width="100%" height="300" style="border: 0" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>

                        </div>


                        <!-- Testimonials Section -->
                        <section class="container mx-auto">
                            <h3 class="text-xl font-semibold mb-4">What Visitors Say</h3>

                            <div class="mt-6 grid md:grid-cols-3 gap-6">
                                <div class="bg-white p-6 rounded-lg shadow-md">
                                    <p class="text-gray-600 italic">"A magical place that feels like stepping back in
                                        time.
                                        Alberobello is a must-visit!"</p>
                                    <h4 class="mt-4 font-bold">- Maria, Spain</h4>
                                </div>
                                <div class="bg-white p-6 rounded-lg shadow-md">
                                    <p class="text-gray-600 italic">"I was blown away by the beauty and history of the
                                        Trulli.
                                        Incredible experience!"</p>
                                    <h4 class="mt-4 font-bold">- Luca, Italy</h4>
                                </div>
                                <div class="bg-white p-6 rounded-lg shadow-md">
                                    <p class="text-gray-600 italic">"A stunning and peaceful place. The history behind
                                        Trulli is
                                        fascinating!"</p>
                                    <h4 class="mt-4 font-bold">- Emma, UK</h4>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>

                <!-- Colonna destra: Verifica disponibilità e contatto host -->
                <div>
                    <!-- Componente verifica disponibilità e contatto host -->
                    <div class="bg-white rounded-lg shadow-md p-6 sticky top-[100px]">
                        <div v-if="trullo.pricePerNight" class="flex items-baseline justify-between mb-4">
                            <span class="text-2xl font-bold">€{{ trullo.pricePerNight }}</span>
                            <span class="text-gray-600">a notte</span>
                        </div>

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
                                        <option value="1">1 ospite</option>
                                        <option value="2">2 ospiti</option>
                                        <option value="3">3 ospiti</option>
                                        <option value="4">4 ospiti</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition mb-3"
                            @click="checkAvailability">
                            Verifica disponibilità
                        </button>

                        <a :href="getWhatsAppLink()" target="_blank"
                            class="w-full flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-black py-3 rounded-lg font-medium transition">
                            <span class="material-icons mr-2">call</span>
                            Contatta l'host
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface NightInfo {
    icon: string;
    text: string;
}

interface Service {
    icon: string;
    text: string;
}

interface Amenity {
    icon: string;
    text: string;
}

interface Rule {
    allowed: boolean;
    text: string;
}

interface UsefulInfo {
    text: string;
}

interface Owner {
    name: string;
    avatar?: string;
    since: string;
    description: string;
    phone: string;
}

interface Trullo {
    id: string;
    name: string;
    coverImage?: string;
    images: string[];
    rating: number;
    reviewsCount: number;
    location: string;
    pricePerNight?: number;
    description: string;
    nightInfo: NightInfo[];
    services: Service[];
    amenities: Amenity[];
    rules: Rule[];
    usefulInfo: UsefulInfo[];
    owner: Owner;
}

interface AvailabilityPeriod {
    period: string;
    available: boolean;
}

// Stato per form di contatto
const checkIn = ref(new Date().toISOString().split('T')[0]);
const checkOut = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
const guests = ref('2');

// Esempio di disponibilità recenti
const recentAvailability = ref<AvailabilityPeriod[]>([
    { period: '15 Apr - 22 Apr', available: true },
    { period: '1 Mag - 8 Mag', available: true },
    { period: '20 Mag - 27 Mag', available: false },
    { period: '10 Giu - 17 Giu', available: true },
]);

// Dati di esempio - in un'applicazione reale sarebbero caricati da un'API
const trullo: Trullo = {
    id: '123',
    name: 'Trullo Romantico con Piscina',
    rating: 4.9,
    reviewsCount: 128,
    location: 'Alberobello, Puglia',
    // pricePerNight: 120,
    description: `Questo autentico trullo pugliese è stato completamente ristrutturato per offrirti un soggiorno indimenticabile nel cuore della Valle d'Itria.
  
  Immerso tra ulivi secolari, offre privacy assoluta e un ambiente rilassante, perfetto per una fuga romantica o una vacanza familiare.
  
  Il trullo dispone di due camere da letto arredate con gusto, un bagno moderno, una cucina completamente attrezzata e un ampio soggiorno con camino. All'esterno, potrai goderti la piscina privata, una zona pranzo all'aperto e un barbecue.`,
    coverImage: "/13/PHOTO-2024-05-07-13-40-52.jpg",
    images: [
        "/13/577082261.jpg",
        "/13/577082264.jpg",
        "/13/PHOTO-2024-05-07-13-40-52 8.jpg",
        "/13/PHOTO-2024-05-07-13-40-52.jpg",
    ],
    nightInfo: [
        { icon: 'people_alt', text: '4 ospiti' },
        { icon: 'hotel', text: '2 camere da letto' },
        { icon: 'bathtub', text: '1 bagno' },
    ],
    services: [
        { icon: 'wifi', text: 'Wi-Fi gratuito' },
        { icon: 'ac_unit', text: 'Aria condizionata' },
        { icon: 'local_parking', text: 'Parcheggio gratuito' },
    ],
    amenities: [
        { icon: 'pool', text: 'Piscina privata' },
        { icon: 'fireplace', text: 'Camino' },
        { icon: 'outdoor_grill', text: 'Barbecue' },
    ],
    rules: [
        { allowed: true, text: 'Check-in dalle 15:00 alle 20:00' },
        { allowed: true, text: 'Check-out entro le 10:00' },
        { allowed: false, text: 'Non è permesso fumare' },
        { allowed: false, text: 'Gli animali non sono ammessi' },
    ],
    usefulInfo: [
        { text: 'A 10 minuti di auto dal centro di Alberobello' },
        { text: 'Possibilità di organizzare tour della regione' },
        { text: 'Kit di benvenuto con prodotti locali' },
    ],
    owner: {
        name: 'Marco Rossi',
        since: '2018',
        phone: '+393331234567',
        description: 'Ciao, sono Marco! Amo la Puglia e sarò felice di darti consigli sui posti da visitare e le specialità da assaggiare durante il tuo soggiorno.'
    }
};

// Funzione per verificare la disponibilità
const checkAvailability = () => {
    // Qui implementeresti la logica per verificare la disponibilità tramite i dati .ics
    console.log(`Verificando disponibilità dal ${checkIn.value} al ${checkOut.value} per ${guests.value} ospiti`);
    alert(`Struttura disponibile per le date selezionate! Contatta l'host per procedere con la prenotazione.`);
};

// Funzione per generare il link WhatsApp
const getWhatsAppLink = () => {
    const message = encodeURIComponent(
        `Ciao ${trullo.owner.name}, sono interessato al tuo "${trullo.name}" ` +
        `dal ${checkIn.value} al ${checkOut.value} per ${guests.value} ospiti. È disponibile?`
    );
    return `https://wa.me/${trullo.owner.phone.replace(/\+/g, '')}?text=${message}`;
};
</script>
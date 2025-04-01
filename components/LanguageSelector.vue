<template>
  <div class="relative">
    <button @click="toggleDropdown" class="flex items-center gap-2 focus:outline-none" aria-haspopup="true"
      :aria-expanded="isOpen">

      <span :class="`material-icons text-${textWhite ? 'white' : 'black'}-600 h-5 w-5`">language</span>


      <span>{{ currentLocaleLabel }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-if="isOpen" class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20" role="menu">
      <div class="py-1 flex flex-col">
        <NuxtLink v-for="lang in availableLocales" :key="lang.code" :to="switchLocalePath(lang.code as Locale)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
          :class="{ 'font-semibold': currentLocale === lang.code }" role="menuitem">
          <!-- Bandiera italiana -->
          <span v-if="lang.code === 'it'" class="inline-block w-5 h-3.5 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
              <rect width="1" height="2" fill="#009246" />
              <rect width="1" height="2" x="1" fill="#fff" />
              <rect width="1" height="2" x="2" fill="#ce2b37" />
            </svg>
          </span>

          <!-- Bandiera inglese (UK) -->
          <span v-if="lang.code === 'en'" class="inline-block w-5 h-3.5 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
              <clipPath id="s">
                <path d="M0,0 v30 h60 v-30 z" />
              </clipPath>
              <clipPath id="t">
                <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
              </clipPath>
              <g clip-path="url(#s)">
                <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
                <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4" />
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
              </g>
            </svg>
          </span>

          {{ lang.label }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n, type Locale } from 'vue-i18n';

withDefaults(defineProps<{
  textWhite?: boolean;
}>(), ({
  textWhite: true
}));

const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

// Riferimento per tracciare lo stato del dropdown
const isOpen = ref(false);

// Definisci le lingue disponibili con etichette
const availableLocales = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
];

// Traccia la lingua corrente
const currentLocale = computed(() => locale.value);

// Ottieni l'etichetta della lingua attualmente selezionata
const currentLocaleLabel = computed(() => {
  const found = availableLocales.find(lang => lang.code === currentLocale.value);
  return found ? found.label : currentLocale.value;
});

// Funzione per aprire/chiudere il dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Chiudi il dropdown quando si fa clic all'esterno
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    isOpen.value = false;
  }
};

// Aggiungi e rimuovi event listener per i clic esterni
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
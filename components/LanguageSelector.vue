<template>
  <div class="relative">
    <button @click="toggleDropdown" class="flex items-center gap-2 focus:outline-none w-24" aria-haspopup="true"
      :aria-expanded="isOpen">
      <span :class="`material-icons text-${textWhite ? 'white' : 'black'}-600 h-5 w-5`">language</span>
      <span>{{ currentLocaleLabel }}</span>
      <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg> -->
    </button>

    <!-- Overlay a tutto schermo -->
    <Teleport to="body">
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
        enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div v-if="isOpen"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center"
          @click="closeOnBackdropClick">
          <div class="bg-white w-full sm:w-96 rounded-t-xl sm:rounded-xl overflow-hidden" @click.stop>
            <div class="p-4 border-b">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-900">{{ t('selectLanguage') }}</h3>
                <button @click="isOpen = false" class="text-gray-400 hover:text-gray-500">
                  <span class="material-icons">close</span>
                </button>
              </div>
            </div>

            <div class="p-1">
              <NuxtLink v-for="lang in availableLocales" :key="lang.code" :to="switchLocalePath(lang.code as Locale)"
                class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
                :class="{ 'bg-blue-50': currentLocale === lang.code }" @click="isOpen = false">
                <div class="flex items-center gap-3">
                  <!-- Bandiera italiana -->
                  <span v-if="lang.code === 'it'" class="inline-block w-6 h-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2">
                      <rect width="1" height="2" fill="#009246" />
                      <rect width="1" height="2" x="1" fill="#fff" />
                      <rect width="1" height="2" x="2" fill="#ce2b37" />
                    </svg>
                  </span>

                  <!-- Bandiera inglese (UK) -->
                  <span v-if="lang.code === 'en'" class="inline-block w-6 h-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
                      <clipPath id="s2">
                        <path d="M0,0 v30 h60 v-30 z" />
                      </clipPath>
                      <clipPath id="t2">
                        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                      </clipPath>
                      <g clip-path="url(#s2)">
                        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
                        <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t2)" stroke="#C8102E" stroke-width="4" />
                        <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
                        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
                      </g>
                    </svg>
                  </span>
                  <span class="text-base">{{ lang.name }}</span>
                </div>

                <span v-if="currentLocale === lang.code" class="material-icons text-blue-600">check</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { type Locale } from 'vue-i18n';

withDefaults(defineProps<{
  textWhite?: boolean;
}>(), ({
  textWhite: true
}));

const { locale, t, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const isMobile = ref(false);

const availableLocales = computed(() => locales.value);
const currentLocale = computed(() => locale.value);

const currentLocaleLabel = computed(() => {
  const found = availableLocales.value.find(lang => lang.code === currentLocale.value);
  return found ? found.name : currentLocale.value;
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Chiudi il dropdown quando si fa clic all'esterno (solo per desktop)
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!isMobile.value && !target.closest('.relative')) {
    isOpen.value = false;
  }
};

// Chiudi il dropdown cliccando sul backdrop dell'overlay (per mobile)
const closeOnBackdropClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains('fixed')) {
    isOpen.value = false;
  }
};

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 640; // 640px è il breakpoint sm di Tailwind
};

// Blocca lo scrolling del body quando l'overlay è aperto su mobile
watch(isOpen, (newVal) => {
  if (isMobile.value) {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', checkIfMobile);
  checkIfMobile();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', checkIfMobile);

  document.body.style.overflow = '';
});
</script>
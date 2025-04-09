<template>
  <div class="relative">
    <button @click="toggleDropdown" class="flex items-center gap-2 focus:outline-none w-24" aria-haspopup="true"
      :aria-expanded="isOpen">
      <span>{{ currentLocaleLabel }}</span>
      <span :class="`material-icons text-${textWhite ? 'white' : 'black'}-600 h-5 w-5`">language</span>
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
                <div class="flex items-center justify- center gap-3">
                  <!-- Bandiera italiana -->
                  <span v-if="lang.code === 'it'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="#fff" d="M10 4H22V28H10z"></path>
                      <path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#41914d"></path>
                      <path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)"
                        fill="#bf393b"></path>
                      <path
                        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                        opacity=".15"></path>
                      <path
                        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                        fill="#fff" opacity=".2"></path>
                    </svg>
                  </span>

                  <!-- Bandiera inglese (UK) -->
                  <span v-if="lang.code === 'en'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect>
                      <path
                        d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
                        fill="#fff"></path>
                      <path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932">
                      </path>
                      <path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
                        fill="#b92932"></path>
                      <path
                        d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
                        fill="#fff"></path>
                      <rect x="13" y="4" width="6" height="24" fill="#fff"></rect>
                      <rect x="1" y="13" width="30" height="6" fill="#fff"></rect>
                      <rect x="14" y="4" width="4" height="24" fill="#b92932"></rect>
                      <rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932">
                      </rect>
                      <path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
                        fill="#b92932"></path>
                      <path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
                        fill="#b92932"></path>
                      <path
                        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                        opacity=".15"></path>
                      <path
                        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                        fill="#fff" opacity=".2"></path>
                    </svg>
                  </span>

                  <span v-if="lang.code === 'fr'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="#fff" d="M10 4H22V28H10z"></path>
                      <path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#092050"></path>
                      <path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)"
                        fill="#be2a2c"></path>
                      <path
                        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                        opacity=".15"></path>
                      <path
                        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                        fill="#fff" opacity=".2"></path>
                    </svg>
                  </span>

                  <span v-if="lang.code === 'de'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="#cc2b1d" d="M1 11H31V21H1z"></path>
                      <path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z"></path>
                      <path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)"
                        fill="#f8d147"></path>
                      <path
                        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                        opacity=".15"></path>
                      <path
                        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                        fill="#fff" opacity=".2"></path>
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
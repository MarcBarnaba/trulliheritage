<template>
  <nav class="fixed top-0 left-0 z-10 w-full transition-all duration-200" :class="[
    scrolled ? 'bg-white text-gray-800 shadow-md py-2' : 'bg-transparent text-white py-2',
    isMenuOpen ? 'bg-white text-gray-800' : '',
  ]">
    <div>
      <div class="flex justify-between items-center px-8">
        <NuxtLink :to="localePath('/')" class="shrink-0">
          <div class="flex justify-center items-center">
            <IconsLogo :height="80" :width="80" />
            <!-- <IconsLogoBW :height="80" :width="80" /> -->
            <h1 class="font-light text-3xl" :class="isMenuOpen && !scrolled ? 'text-gray-800' : ''
              ">Trulli Heritage</h1>
          </div>
        </NuxtLink>


        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <ul class="flex items-center gap-x-8">
            <li>
              <NuxtLink :to="localePath('/trulli')"
                class="font-medium py-2 px-1 hover:text-teal-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all">
                {{ t('menu.trulli') }}
              </NuxtLink>
            </li>
            <li>
              <a href="#footer"
                class="font-medium py-2 px-1 hover:text-teal-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all">
                {{ t('menu.about') }}
              </a>
            </li>
            <li>
              <LanguageSelector class="transition-colors" />
            </li>
          </ul>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden p-2 rounded-md focus:outline-none"
          :class="isMenuOpen ? 'text-gray-800' : ''">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="w-7 h-7 transition-all" v-if="!isMenuOpen">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            class="w-7 h-7 transition-all" v-else>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="text-gray-800 md:hidden mt-2 py-2 rounded-md transition-all ">
        <ul>
          <li>
            <NuxtLink to="/trulli"
              class="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-teal-600 transition-colors"
              @click="isMenuOpen = false">
              {{ t('menu.trulli') }}
            </NuxtLink>
          </li>
          <li>
            <a href="#footer"
              class="block px-4 py-3 text-gray-800 hover:bg-gray-100 hover:text-teal-600 transition-colors"
              @click="isMenuOpen = false">
              {{ t('menu.about') }}
            </a>
          </li>
          <li class="px-4 py-3">
            <LanguageSelector :textWhite="scrolled" />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

const { t, locale } = useI18n();
const isMenuOpen = ref(false);
const scrolled = ref(false);

const localePath = useLocalePath()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Chiamato inizialmente per impostare il valore corretto
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
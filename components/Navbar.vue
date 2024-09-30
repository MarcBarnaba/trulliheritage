<template>
  <nav class="absolute top-0 left-0 z-10 w-full text-white p-4">
    <div class="flex justify-end items-center">
      <div class="text-xl font-bold">
        <!-- Navbar Links -->
        <ul class="hidden md:flex md:justify-end md:items-center gap-x-16">
          <li><a class="hover:underline text-2xl">Al 13</a></li>
          <li><a href="#gallery" class="hover:underline">Gallery</a></li>
          <li><a href="#map" class="hover:underline">Where are we</a></li>
          <li><a href="#faq" class="hover:underline">F.A.Q.</a></li>
        </ul>

        <!-- Mobile Menu -->
        <ul v-if="isMenuOpen" class="absolute top-full left-0 w-full">
          <!-- <li class="p-4"><a href="#" class="hover:underline text-2xl">Al 13</a></li> -->
          <li class="p-4">
            <a href="#gallery" class="hover:underline">Gallery</a>
          </li>
          <li class="p-4">
            <a href="#map" class="hover:underline">Where are we</a>
          </li>
          <li class="p-4"><a href="#faq" class="hover:underline">F.A.Q.</a></li>
        </ul>
      </div>

      <!-- Toggle Button for Mobile -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Reactive variable to control the mobile menu state
const isMenuOpen = ref(false);

// Function to toggle the mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="bg-darkblue text-white pt-8 pb-2 w-full">
    <div class="container px-4">
      <!-- Main footer sections -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Us -->
        <div class="md:col-span-2">
          <h3 class="font-bold text-lg mb-4">{{ t('footer.aboutUs.title') }}</h3>
          <p class="text-sm">
            {{ t('footer.aboutUs.text') }}
          </p>
        </div>

        <div class="md:col-span-1"></div>
        <!-- Contact Info -->
        <div class="md:col-span-1 order-last">
          <h3 class="font-bold text-lg mb-4">{{ t('footer.contactUs') }}</h3>
          <ul class="text-sm w-full">
            <li>
              {{ t('footer.email.key') }}
              <a href="mailto:barnabacostruzionisrl@gmail.com" class="text-gray-400 hover:text-white">{{
                t('footer.email.value') }}
              </a>
            </li>
            <li>
              {{ t('footer.phone.key') }}
              <a href="tel:+393209461838" class="text-gray-400 hover:text-white">{{ t('footer.phone.value') }}</a>
            </li>
          </ul>
        </div>
      </div>


    </div>
    <!-- Copyright -->
    <div class="mt-8 w-full text-center text-sm text-gray-500">
      {{ t('footer.copyright') }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

</script>
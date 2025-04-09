<template>
  <div id="footer" class="bg-darkblue text-white pt-8 pb-2 w-full">
    <div class="container px-4">
      <!-- Main footer sections -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Us -->
        <div class="md:col-span-2">
          <div class="flex justify-between items-center">
            <h3 class="font-bold text-lg mb-4">{{ t('footer.aboutUs.title') }}</h3>
          </div>
          <p class="text-sm">
            {{ t('footer.aboutUs.text') }}
          </p>
          <div class="flex pt-4 pr-4">
            <div class="flex -space-x-3 rtl:space-x-reverse mb-2">
              <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src="https://avatar.iran.liara.run/public/4" alt="">
              <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                src="https://avatar.iran.liara.run/public/5" alt="">
            </div>
          </div>

        </div>

        <div class="md:col-span-1"></div>
        <!-- Contact Info -->
        <div class="md:col-span-1 order-last">
          <h3 class="font-bold text-lg mb-4">{{ t('footer.contactUs') }}</h3>
          <div class="flex items-center gap-4">
            <NuxtLink to="mailto:barnabacostruzionisrl@gmail.com" class="block"><span
                class="material-icons align-bottom text-[32px]">mail</span>
            </NuxtLink>
            <NuxtLink to="tel:+393209461838" class="block"><span
                class="material-icons align-bottom text-[32px]">call</span>
            </NuxtLink>
            <NuxtLink :to="getWhatsAppLink('+393209461838')">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                <path fill="#ffffff"
                  d="M19.077,4.928C17.191,3.041,14.683,2.001,12.011,2c-5.506,0-9.987,4.479-9.989,9.985 c-0.001,1.76,0.459,3.478,1.333,4.992L2,22l5.233-1.237c1.459,0.796,3.101,1.215,4.773,1.216h0.004 c5.505,0,9.986-4.48,9.989-9.985C22.001,9.325,20.963,6.816,19.077,4.928z M16.898,15.554c-0.208,0.583-1.227,1.145-1.685,1.186 c-0.458,0.042-0.887,0.207-2.995-0.624c-2.537-1-4.139-3.601-4.263-3.767c-0.125-0.167-1.019-1.353-1.019-2.581 S7.581,7.936,7.81,7.687c0.229-0.25,0.499-0.312,0.666-0.312c0.166,0,0.333,0,0.478,0.006c0.178,0.007,0.375,0.016,0.562,0.431 c0.222,0.494,0.707,1.728,0.769,1.853s0.104,0.271,0.021,0.437s-0.125,0.27-0.249,0.416c-0.125,0.146-0.262,0.325-0.374,0.437 c-0.125,0.124-0.255,0.26-0.11,0.509c0.146,0.25,0.646,1.067,1.388,1.728c0.954,0.85,1.757,1.113,2.007,1.239 c0.25,0.125,0.395,0.104,0.541-0.063c0.146-0.166,0.624-0.728,0.79-0.978s0.333-0.208,0.562-0.125s1.456,0.687,1.705,0.812 c0.25,0.125,0.416,0.187,0.478,0.291C17.106,14.471,17.106,14.971,16.898,15.554z">
                </path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>


    </div>
    <!-- Copyright -->
    <div class="mt-8 w-full text-center text-sm text-gray-500">
      Made with
      &#x2764;&#xfe0e;
      by Marco
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const getWhatsAppLink = (phone: string) => {
  const message = encodeURIComponent(
    `Ciao Greta!`
  );
  return `https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`;
};

</script>
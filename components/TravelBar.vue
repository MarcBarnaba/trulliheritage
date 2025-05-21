<template>
  <div class="flex items-center gap-6 p-5 bg-white rounded-full shadow-md">
    <div class="flex rounded-full overflow-hidden border border-gray-200">
      <div class="p-3 border-r flex items-center gap-6">
        <label class="text-xs text-gray-600 whitespace-nowrap">{{ t('checkIn') }}</label>
        <input type="date" class="border-none py-1 focus:ring-0 placeholder-gray-400" v-model="checkIn"
          :min="formatDateForInput(currentDate)" :placeholder="t('dateIntervalPlaceholder')" />
      </div>
      <div class="p-3 flex items-center gap-6">
        <label class="text-xs text-gray-600 whitespace-nowrap">{{ t('checkOut') }}</label>
        <input type="date" class="border-none py-1 focus:ring-0 placeholder-gray-400" v-model="checkOut"
          :min="checkIn || formatDateForInput(currentDate)" :placeholder="t('dateIntervalPlaceholder')" />
      </div>
    </div>
    <div class="flex items-center rounded-full overflow-hidden border border-gray-200 h-full">
      <div class="flex items-center h-full">
        <button class="px-2 text-gray-600 hover:bg-gray-200 h-full" @click="handleAdultsChange('decrement')">
          -
        </button>
        <span class="text-gray-600 whitespace-nowrap px-3 border-l border-r border-gray-200 h-full flex items-center">{{
          adults }} {{ t('guests') }}
          <span class="material-icons text-black text-md ml-4">groups</span></span>

        <button class="px-2 text-gray-600 hover:bg-gray-200 h-full" @click="handleAdultsChange('increment')">
          +
        </button>
      </div>
    </div>
    <span @click="handleCTA()"
      class="material-icons text-white bg-gold rounded-full p-4 hover:cursor-pointer">search</span>
  </div>
</template>

<script setup>
const router = useRouter();
const { t } = useI18n()
const localePath = useLocalePath()
const checkIn = ref(null);
const checkOut = ref(null);
const adults = ref(1);
const currentDate = new Date();

// Formatta la data in formato yyyy-MM-dd per l'attributo min dell'input
const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Formatta la data per l'URL
const formatDateForURL = (dateString) => {
  if (!dateString) return null;
  // La data è già nel formato yyyy-MM-dd
  return dateString;
};

const handleAdultsChange = (action) => {
  if (action === 'increment') {
    adults.value += 1;
  } else {
    adults.value = Math.max(adults.value - 1, 1);
  }
};

const handleCTA = () => {
  const query = {};
  if (checkIn.value) {
    query.checkin = formatDateForURL(checkIn.value);
  }
  if (checkOut.value) {
    query.checkout = formatDateForURL(checkOut.value);
  }
  query.adults = adults.value;

  router.push({ path: localePath('/trulli'), query });
};

// Aggiungi watch per assicurarti che checkout sia sempre dopo checkin
watch(checkIn, (newCheckIn) => {
  if (newCheckIn && checkOut.value && checkOut.value < newCheckIn) {
    checkOut.value = newCheckIn;
  }
});
</script>

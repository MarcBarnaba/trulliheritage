<template>
  <div class="flex items-center gap-6 p-5 bg-white rounded-full shadow-md w-2/3">
    <VueDatePicker v-model="dateRange" range :model-type="'yyyy-MM-dd'" :teleport="true"
      :placeholder="'Seleziona un intervallo di date...'" :min-date="currentDate" :auto-position="false"
      :enable-time-picker="false" class="px-4 py-3 text-gray-600 rounded-full focus:outline-none focus:ring-0">
    </VueDatePicker>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span class="text-gray-600 min-w-16">{{ adults }} Ospiti</span>
        <button class="p-2 text-gray-600 rounded-full hover:bg-gray-200" @click="handleAdultsChange('decrement')">
          -
        </button>
        <button class="p-2 text-gray-600 rounded-full hover:bg-gray-200" @click="handleAdultsChange('increment')">
          +
        </button>
      </div>
    </div>
    <span @click="handleCTA()"
      class="material-icons text-white bg-gold rounded-full p-4 hover:cursor-pointer">search</span>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const router = useRouter();
const localePath = useLocalePath()
const dateRange = ref(null);
const adults = ref(1);
const currentDate = new Date();

const handleAdultsChange = (action) => {
  if (action === 'increment') {
    adults.value += 1;
  } else {
    adults.value = Math.max(adults.value - 1, 1);
  }
};

const handleCTA = () => {
  const query = {};
  if (dateRange.value && dateRange.value.length === 2) {
    query.checkin = dateRange.value[0];
    query.checkout = dateRange.value[1];
  }
  query.adults = adults.value;

  router.push({ path: localePath('/trulli'), query });
};

</script>
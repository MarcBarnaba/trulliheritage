<template>
  <!-- Le Nostre Strutture -->
  <section id="structures" class="py-16 px-8">
    <h2 class="text-3xl font-bold mb-4">Trulli</h2>
    <div class="container w-full">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(structure, index) in structures" :key="index" class="border rounded bg-white">
          <div class="bg-white">
            <img :src="structure.image" alt="Immagine del trullo"
              class="mb-4 w-full h-48 object-cover rounded-tl rounded-tr">
            <div class="bg-white flex justify-between items-center mb-2 p-4">
              <h3 class="text-xl font-semibold">{{ structure.name }}</h3>
              <div class="flex justify-center items-center">
                <h2 class="mr-2">2</h2>
                <IconsUser />
              </div>
            </div>
            <div class="bg-white mb-4 px-4">{{ structure.shortDescription }}</div>

          </div>

          <div class="bg-white flex justify-between items-center">
            <div class="w-1/2 flex justify-center items-center gap-4">
              <IconsWifi />
              <IconsWind />
            </div>
            <Buttoon color="#FFFFFF" :textWhite="false" :text="'Scopri di più'" :show-icon="true" />
          </div>

        </div>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">
defineProps<{
  structures: {
    image: string;
    name: string;
    shortDescription: string;
  }[]
}>()
</script>
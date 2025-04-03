<template>
  <div class="flex flex-col lg:flex-row items-center justify-center w-full py-8">
    <div class="flex flex-col items-center justify-center h-full w-full lg:w-1/2">
      <Paragraph :title="'Vuoi saperne di più?'" :title-size="'3xl'"></Paragraph>
      <NuxtImg :src="'/contact.png'" class="pb-8 w-1/2 flex-grow" />
    </div>
    <div class="w-full lg:w-1/2 px-4 lg:px-12">
      <!-- <Paragraph :title="'Contattaci'" :title-size="'3xl'" /> -->

      <IconsGold />
      <form @submit.prevent="submitForm" class="max-w-lg mx-auto">
        <!-- Honeypot -->
        <div class="hidden">
          <label for="website">Website</label>
          <input type="text" id="website" name="website" v-model="formData.honeypot">
        </div>

        <!-- Nome -->
        <div class="mb-6">
          <label for="name" class="block text-gray-700 font-medium mb-2">Nome</label>
          <input type="text" id="name" v-model="formData.name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required>
          <p v-if="errors.name" class="mt-1 text-red-500 text-sm">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email" v-model="formData.email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required>
          <p v-if="errors.email" class="mt-1 text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <!-- Testo -->
        <div class="mb-6">
          <label for="message" class="block text-gray-700 font-medium mb-2">Messaggio</label>
          <textarea id="message" v-model="formData.message" rows="5"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required></textarea>
          <p v-if="errors.message" class="mt-1 text-red-500 text-sm">{{ errors.message }}</p>
        </div>

        <!-- Submit button -->
        <div class="text-center">
          <button type="submit"
            class="px-6 py-3 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition-colors"
            :disabled="submitting">
            {{ submitting ? 'Invio in corso...' : 'Invia messaggio' }}
          </button>
          <p v-if="submitSuccess" class="mt-4 text-green-500">Messaggio inviato con successo!</p>
          <p v-if="submitError" class="mt-4 text-red-500">Si è verificato un errore. Riprova più tardi.</p>
        </div>
      </form>


    </div>
  </div>
</template>

<script setup lang="ts">
// Interfaccia per i dati del form
interface FormData {
  name: string
  email: string
  message: string
  honeypot: string // Campo honeypot per rilevare i bot
}

// Interfaccia per gli errori del form
interface FormErrors {
  name?: string
  email?: string
  message?: string
}

// Stati del form
const formData = reactive<FormData>({
  name: '',
  email: '',
  message: '',
  honeypot: '' // Se compilato, è probabilmente un bot
})

const errors = reactive<FormErrors>({})
const submitting = ref<boolean>(false)
const submitSuccess = ref<boolean>(false)
const submitError = ref<boolean>(false)

// Email destinataria (fissa)
const RECIPIENT_EMAIL = 'info@tuodominio.it' // Sostituisci con l'email desiderata

// Validazione del form
const validateForm = (): boolean => {
  errors.name = !formData.name ? 'Il nome è obbligatorio' : undefined

  errors.email = !formData.email ? 'L\'email è obbligatoria' : undefined
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Inserisci un indirizzo email valido'
  }

  errors.message = !formData.message ? 'Il messaggio è obbligatorio' : undefined

  // Verifica se ci sono errori
  return !errors.name && !errors.email && !errors.message
}

// Invio del form
const submitForm = async () => {
  // Se il campo honeypot è compilato, è probabilmente un bot. Fingiamo di inviare ma non facciamo nulla.
  if (formData.honeypot) {
    // Simuliamo un invio positivo per non far capire al bot che lo abbiamo identificato
    submitting.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    submitting.value = false
    submitSuccess.value = true
    return
  }

  // Validazione form
  if (!validateForm()) {
    return
  }

  submitting.value = true
  submitError.value = false
  submitSuccess.value = false

  try {
    // Qui inseriamo il codice per inviare l'email
    // Un esempio semplice potrebbe essere una chiamata API a un endpoint del tuo backend
    // o l'utilizzo di un servizio esterno come EmailJS

    // Esempio con fetch a un endpoint locale
    await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recipient: RECIPIENT_EMAIL
      }),
    })

    // Reset del form
    formData.name = ''
    formData.email = ''
    formData.message = ''

    submitSuccess.value = true

    // Nascondi il messaggio di successo dopo 5 secondi
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Errore durante l\'invio del form:', error)
    submitError.value = true
  } finally {
    submitting.value = false
  }
}
</script>
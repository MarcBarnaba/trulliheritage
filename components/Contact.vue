<template>
  <div class="flex flex-col lg:flex-row items-center justify-center w-full py-8">
    <div class="flex flex-col items-center justify-center h-full w-full lg:w-1/2">
      <Paragraph :title="t('knowMore')" :title-size="'3xl'"></Paragraph>
      <NuxtImg :src="'humans/contact.png'" class="pb-8 w-1/2 flex-grow" />
    </div>
    <div class="w-full lg:w-1/2 px-4 lg:px-12">
      <!-- <Paragraph :title="'Contattaci'" :title-size="'3xl'" /> -->

      <IconsGold />
      <form @submit.prevent="submitForm" class="max-w-lg mx-auto">
        <!-- Honeypot -->
        <div class="hidden">
          <input type="text" id="website" name="website" v-model="formData.honeypot">
        </div>

        <!-- Nome -->
        <div class="mb-6">
          <label for="name" class="block text-gray-700 font-medium mb-2">{{ t('form.name.label') }}</label>
          <input type="text" id="name" v-model="formData.name"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required>
          <p v-if="errors.name" class="mt-1 text-red-500 text-sm">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label for="email" class="block text-gray-700 font-medium mb-2">{{ t('form.email.label') }}</label>
          <input type="email" id="email" v-model="formData.email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required>
          <p v-if="errors.email" class="mt-1 text-red-500 text-sm">{{ errors.email }}</p>
        </div>

        <!-- Testo -->
        <div class="mb-6">
          <label for="message" class="block text-gray-700 font-medium mb-2">{{ t('form.message.label') }}</label>
          <textarea id="message" v-model="formData.message" rows="5"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required></textarea>
          <p v-if="errors.message" class="mt-1 text-red-500 text-sm">{{ errors.message }}</p>
        </div>

        <!-- Submit button -->
        <div class="text-center">
          <button type="submit" class="px-6 py-3 bg-gold text-white font-medium rounded-full " :disabled="submitting">
            <div class="flex items-center gap-2">
              {{ submitting ? t('form.button.sending') : t('form.button.send') }}
              <span class="material-icons">send</span>
            </div>

          </button>
          <p v-if="submitSuccess" class="mt-4 text-green-500">{{ t('form.messageSuccess') }}</p>
          <p v-if="submitError" class="mt-4 text-red-500">{{ t('form.messageError') }}</p>
        </div>
      </form>


    </div>
  </div>
</template>

<script setup lang="ts">
interface FormData {
  name: string
  email: string
  message: string
  honeypot: string // Campo honeypot per rilevare i bot
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  message: '',
  honeypot: ''
})

const errors = reactive<FormErrors>({})
const submitting = ref<boolean>(false)
const submitSuccess = ref<boolean>(false)
const submitError = ref<boolean>(false)
const { t } = useI18n()

// TODO
const RECIPIENT_EMAIL = 'marcbarnaba@gmail.com'

const validateForm = (): boolean => {
  errors.name = !formData.name ? t('form.name.validation') : undefined

  errors.email = !formData.email ? t('form.email.validation') : undefined
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = t('form.email.helpText')
  }

  errors.message = !formData.message ? t('form.message.validation') : undefined

  return !errors.name && !errors.email && !errors.message
}

const submitForm = async () => {
  // Se il campo honeypot è compilato, è probabilmente un bot. Fingiamo di inviare ma non facciamo nulla.
  if (formData.honeypot) {
    submitting.value = true
    await new Promise(resolve => setTimeout(resolve, 1000))
    submitting.value = false
    submitSuccess.value = true
    return
  }

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
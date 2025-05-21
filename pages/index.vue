<script setup lang="ts">
import type { ButtoonProps } from '~/components/Buttoon.vue';
import type { CardsSliderProps } from '~/components/CardsSlider.vue';
import type { ExpSliderProps } from '~/components/ExpSlider.vue';
import type { FaqProps } from '~/components/Faq.vue';
import type { FeatureListProps } from '~/components/FeatureList.vue';
import type { HeroProps } from '~/components/Hero.vue';
import type { ParallaxProps } from '~/components/Parallax.vue';
import type { QuoteProps } from '~/components/Quote.vue';
import type { TextImgProps } from '~/components/TextImg.vue';
import { useSeo } from '~/composables/useSeo';


const route = useRoute()
const { t, locale } = useI18n()

const { data: trulli } = await useAsyncData(`${route.path}_trulli`, () => {
  return queryCollection(`${locale.value}_trulli`).all();
}, { lazy: true })

const { data: experiences } = await useAsyncData(`${route.path}_experiences`, () => {
  return queryCollection(`${locale.value}_experiences`).all();
}, { lazy: true })

// Carica i contenuti testuali della pagina
const { data: pageContent, error } = await useAsyncData(`${route.path}_page`, () => {
  return queryCollection(`${locale.value}_pages`).path(`/${locale.value}/pages`).first();
})

if (error.value) {
  throw createError({
    statusCode: 500
  })
}

const { getComponentProps, hasComponent } = useComponentProps(pageContent.value)

const bentoFeatureData = {
  title: "Servizi e Comfort",
  subtitle: "Scopri tutto ciò che offriamo per rendere il tuo soggiorno indimenticabile",
  features: [
    {
      icon: "🏊",
      title: "Piscina Privata",
      description: "Ogni trullo dispone di una piscina privata perfettamente integrata nel paesaggio pugliese, garantendo privacy e relax durante il tuo soggiorno.",
      colSpan: 2,
      rowSpan: 1,
      accent: false
    },
    {
      icon: "🍳",
      title: "Cucina Tradizionale",
      description: "Cucine completamente attrezzate con prodotti locali di benvenuto.",
      colSpan: 1,
      rowSpan: 1
    },
    {
      icon: "🌿",
      title: "Giardino Mediterraneo",
      description: "Ampi spazi esterni con vegetazione tipica mediterranea, ulivi secolari e zone relax dove poter leggere un libro o semplicemente godere del panorama.",
      colSpan: 1,
      rowSpan: 2
    },
    {
      icon: "🚲",
      title: "Esplorazione del Territorio",
      description: "Biciclette a disposizione per esplorare il territorio circostante e scoprire angoli nascosti della campagna pugliese.",
      colSpan: 1,
      rowSpan: 1
    },
    {
      icon: "🌡️",
      title: "Comfort in Ogni Stagione",
      description: "Sistemi di riscaldamento e raffreddamento per garantire il massimo comfort in ogni periodo dell'anno.",
      colSpan: 1,
      rowSpan: 1
    },
    {
      icon: "🧖",
      title: "Experience Wellness",
      description: "Possibilità di prenotare massaggi e trattamenti benessere direttamente nel trullo. Regalati momenti di puro relax tra gli ulivi con i migliori terapisti della regione.",
      colSpan: 2,
      rowSpan: 1,
      accent: false,
    },
  ]
};

const faqData = {
  title: "Domande Frequenti",
  subtitle: "Trova risposta alle domande più comuni sul soggiorno nei nostri trulli",
  faqs: [
    {
      question: "Come funziona il processo di prenotazione?",
      answer: "La prenotazione può essere effettuata direttamente dal nostro sito, compilando il form di richiesta. Risponderemo entro 24 ore con la conferma di disponibilità e i dettagli per il pagamento dell'acconto. Il saldo viene richiesto 30 giorni prima dell'arrivo."
    },
    {
      question: "Qual è la politica di cancellazione?",
      answer: "Per cancellazioni effettuate fino a 60 giorni prima dell'arrivo, rimborsiamo l'intero importo meno le spese di gestione. Per cancellazioni tra 60 e 30 giorni, rimborsiamo il 50% dell'importo. Per cancellazioni sotto i 30 giorni, non è previsto alcun rimborso."
    },
    {
      question: "I trulli sono adatti ai bambini?",
      answer: "Assolutamente sì! I nostri trulli sono family-friendly con spazi esterni sicuri per giocare. Forniamo gratuitamente, su richiesta, lettini per bambini, seggioloni e cancelletti di sicurezza per le scale."
    },
    {
      question: "Gli animali domestici sono ammessi?",
      answer: "Alcuni dei nostri trulli sono pet-friendly. Ti preghiamo di specificare nella richiesta se viaggi con animali domestici, in modo da poterti proporre la sistemazione più adatta."
    },
    {
      question: "È inclusa la pulizia durante il soggiorno?",
      answer: "La pulizia finale è sempre inclusa nel prezzo. Per soggiorni superiori a 7 notti, includiamo anche un servizio di pulizia intermedia con cambio biancheria. Servizi extra di pulizia possono essere richiesti con un costo aggiuntivo."
    },
    {
      question: "Come posso prenotare le esperienze offerte?",
      answer: "Le esperienze possono essere prenotate al momento della conferma del soggiorno o durante la tua permanenza. Consigliamo di prenotare con almeno 48 ore di anticipo per garantire la disponibilità, specialmente in alta stagione."
    }
  ]
};

const p = computed(() => ({
  hero: getComponentProps('Hero') as HeroProps,
  heroBtn: getComponentProps('HeroButtoon') as ButtoonProps,
  quote: getComponentProps('Quote') as QuoteProps,
  textImg: getComponentProps('TextImg') as TextImgProps,
  cardsSlider: getComponentProps('CardsSlider') as CardsSliderProps,
  parallax: getComponentProps('Parallax') as ParallaxProps,
  expSlider: getComponentProps('ExpSlider') as ExpSliderProps,
  featureList: bentoFeatureData || getComponentProps('FeatureList') as FeatureListProps,
  faq: faqData || getComponentProps('Faq') as FaqProps
}))


useSeo({
  title: pageContent.value?.title,
  description: pageContent.value?.description
})

</script>

<template>
  <div>
    <Hero :show-travel-bar="p.hero.showTravelBar" :title="p.hero.title" :tagline="p.hero.tagline"
      :img-src="p.hero.imgSrc">
      <template #btn>
        <Buttoon :color="p.heroBtn.color" :textWhite="p.heroBtn.textWhite" :text="p.heroBtn.text"
          :show-icon="p.heroBtn.showIcon" :url="p.heroBtn.url" class="block md:hidden" />
      </template>
    </Hero>

    <Quote :text="p.quote.text" />

    <TextImg :paragraph="p.textImg.paragraph" :img-path="p.textImg.imgPath" />

    <CardsSlider v-if="trulli" :title="p.cardsSlider.title" :structures="trulli" :show-more="p.cardsSlider.showMore"
      :showMorePath="p.cardsSlider.showMorePath" />

    <Parallax :src="p.parallax.src" height="32rem" :parallaxStrength="p.parallax.parallaxStrength" />

    <ExpSlider v-if="experiences" :title="p.expSlider.title" :experiences="experiences"
      :show-more="p.expSlider.showMore" :showMorePath="p.expSlider.showMorePath" />

    <FeatureList :title="p.featureList.title" :subtitle="p.featureList.subtitle" :features="p.featureList.features" />

    <Faq :title="p.faq.title" :subtitle="p.faq.subtitle" :faqs="p.faq.faqs" />

    <Contact />

  </div>
</template>

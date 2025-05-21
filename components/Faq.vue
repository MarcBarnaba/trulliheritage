<script setup lang="ts">
export interface FaqProps {
    title: string
    subtitle: string
    faqs: Array<{
        question: string
        answer: string
    }>
}
const props = defineProps<FaqProps>();

const openIndex = ref(-1);

const toggleFaq = (index: number) => {
    openIndex.value = openIndex.value === index ? -1 : index;
};
</script>

<template>
    <section class="py-8 px-8 bg-white">
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-semibold text-stone-900 mb-3">{{ title }}</h2>
                <p v-if="subtitle" class="text-lg text-stone-600">{{ subtitle }}</p>
            </div>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="border border-stone-200 rounded-lg overflow-hidden">
                    <button @click="toggleFaq(index)"
                        class="w-full flex justify-between items-center p-5 text-left bg-stone-50 hover:bg-stone-100 transition-colors duration-200">
                        <span class="text-lg font-medium text-stone-900">{{ faq.question }}</span>
                        <span class="text-olive-600 text-xl">
                            {{ openIndex === index ? '−' : '+' }}
                        </span>
                    </button>
                    <div v-show="openIndex === index" class="p-5 bg-white border-t border-stone-200">
                        <p class="text-stone-700">{{ faq.answer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
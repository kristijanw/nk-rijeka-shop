<script setup lang="ts">
import { useCartStore } from "~/composables/useCart";

defineProps<{
	submitForm: () => void,
    term: () => void,
    termMessage: string,
    loadingForm: boolean,
}>();

const cartStore = useCartStore();

const coupon = ref('');
const emit = defineEmits(['useCoupon']);
</script>

<template>
    <div class="p-10 rounded-lg bg-[#D9F1FD]">
        <p class="pb-10 text-xl font-bold">VAŠA NARUDŽBA</p>

        <p class="flex items-center justify-between text-xl font-normal">
            <span>Ukupno:</span> <span>{{ cartStore.totalPriceQuantity.total.toFixed(2) }} €</span>
        </p>
        <p class="flex items-center justify-between text-xl font-normal">
            <span>Dostava:</span> <span>Besplatna dostava iznad 26,54 €</span>
        </p>
        <p class="flex items-center justify-between text-xl font-normal">
            <span>Dostava:</span> <span>Besplatna dostava iznad 26,54 €</span>
        </p>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <div class="flex items-center gap-2">
            <UInput icon="cuida:ticket-outline" v-model="coupon" size="md" class="w-full" variant="outline" />
            <button @click="$emit('useCoupon', coupon)" class="uppercase btn-secondary xs w-36">
                Iskoristi kupon
            </button>
        </div>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <p class="flex items-center justify-between text-xl font-normal">
            <span>Ukupno za plaćanje:</span> <span>{{ cartStore.totalPriceQuantity.total.toFixed(2) }}
                €</span>
        </p>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <p>
            Vaši osobni podaci koristit će se za obradu vaše narudžbe, pružanja boljeg iskustva na web
            stranici i u
            druge svrhe opisane u našoj <a href="#" class="text-blue-500 underline">pravilima
                privatnosti</a>.
        </p>

        <UCheckbox v-on:change="term" name="terms" class="mt-4">
            <template #label>
                <span class="italic">
                    Prihvaćam i slažem se sa 
                    <a href="#" class="text-blue-500 underline">uvjetima prodaje i pravilima primatnosti</a>
                    <span class="text-red-500"> *</span>
                </span>
            </template>
        </UCheckbox>

        <p v-if="termMessage != ''" class="text-sm italic font-medium text-red-500">{{ termMessage }}</p>

        <UButton :disabled="loadingForm" :loading="loadingForm" @click="submitForm" class="w-full px-5 py-3 mt-4 font-bold text-white uppercase rounded-lg"
            style="background: linear-gradient(79.46deg, #0083C9 3.18%, #58B6E7 107.55%);">
            naruči i plati
        </UButton>
    </div>
</template>
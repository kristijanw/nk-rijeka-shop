<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'

defineProps<{
    submitForm: () => void
    term: () => void
    termMessage: string
    loadingForm: boolean
}>()

const cartStore = useCartStore()

const coupon = ref('')
const emit = defineEmits(['useCoupon', 'selectedDelivery'])

// helper za formatiranje
const fmt = (n: number) => n.toFixed(2).replace('.', ',')

// HR ili ne (po ISO kodu koji postavljaš u store)
const isHR = computed(() => cartStore.destinationCountry === 'HR')

// Opcije prikaza samo za HR (internacionalno nema odabira)
const options = computed(() => [
    {
        value: 'free',
        label: 'Besplatna dostava iznad 50 €',
    },
    // {
    //     value: 'paket24',
    //     label: 'PAKET24 HRVATSKE POŠTE: ' + fmt(cartStore.paket24) + ' €',
    // },
])

const selected = computed({
    get: () => cartStore.selectedDeliveryOption,
    set: (value) => {
        cartStore.changeDelivery(value)
        emit('selectedDelivery', value)
    },
})
</script>

<template>
    <div class="md:p-10 p-5 rounded-lg bg-[#D9F1FD]">
        <p class="text-2xl font-saira font-bold">VAŠA NARUDŽBA</p>

        <div class="pt-2">
            <p class="flex items-center justify-between text-xl font-normal">
                <span>UKUPNO:</span>
                <span>{{ fmt(cartStore.totalPriceQuantity.total) }} €</span>
            </p>

            <p class="flex items-center justify-between text-xl font-normal">
                <span>Dostava:</span>
                <span>
                    <template v-if="cartStore.deliveryPrice === 0">0,00 €</template>
                    <template v-else>{{ fmt(cartStore.deliveryPrice) }} €</template>
                </span>
            </p>
        </div>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <div v-if="cartStore.coupon" class="flex items-center gap-2">
            <UInput
                icon="cuida:ticket-outline"
                v-model="cartStore.coupon.code"
                disabled
                size="xl"
                class="w-full"
                variant="outline"
            />
            <button @click="cartStore.deleteCoupon" class="uppercase bg-red-600 text-white btn-secondary large w-52">
                Obriši kupon
            </button>
        </div>
        <div v-else class="flex items-center gap-2">
            <UInput
                icon="cuida:ticket-outline"
                v-model="coupon"
                size="xl"
                variant="outline"
                class="w-full focus:ring-blue-500"
                color="gray"
            />
            <button @click="$emit('useCoupon', coupon)" class="uppercase btn-secondary large w-52">
                Iskoristi kupon
            </button>
        </div>

        <div v-if="cartStore.coupon">
            <p class="text-green-500 pt-2">Kupon iskorišten</p>

            <div class="flex items-center justify-between gap-2 pt-2">
                <span>
                    Popust kupona:
                    <span v-if="cartStore.coupon.scope === 'category'" class="text-sm text-gray-500">(samo na dresove)</span>
                </span>
                <span>
                    -{{ cartStore.coupon.discount }}<span v-if="cartStore.coupon.type === 'percentage'">%</span
                    ><span v-else>€</span>
                </span>
            </div>
        </div>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <!-- HR: prikaz opcija (radio) kad je iznad 50 €, inače fiksni Paket24 + hint -->
        <div v-if="isHR">
            <div v-if="cartStore.totalPriceQuantity.total >= 50">
                <URadioGroup color="blue" v-model="selected" :options="options" />
            </div>
            <div v-else>
                <span
                    >PAKET24 HRVATSKE POŠTE: <strong>{{ fmt(cartStore.paket24) }} €</strong></span
                >
            </div>
        </div>

        <!-- Internacionalno: nema odabira, samo prikaži izračunatu cijenu ili "besplatna" -->
        <div v-else>
            <p class="mt-1">
                <span v-if="cartStore.deliveryPrice === 0">Besplatna dostava</span>
                <span v-else
                    >Iznos dostave: <strong>{{ fmt(cartStore.deliveryPrice) }} €</strong></span
                >
            </p>
        </div>

        <p class="flex items-center justify-between text-xl font-normal mt-4">
            <span>Ukupno za plaćanje:</span>
            <strong>{{ fmt(cartStore.totalPriceWithDelivery) }} €</strong>
        </p>

        <div class="w-full h-[1px] bg-[#A9DCF7] my-4"></div>

        <p>
            Vaši osobni podaci koristit će se za obradu vaše narudžbe, pružanja boljeg iskustva na web stranici i u
            druge svrhe opisane u našim <a href="#" class="link-plavi body4 underline font-semibold"
                >pravilima privatnosti</a
            >.
        </p>

        <UCheckbox v-on:change="term" id="gdpr" name="terms" class="mt-4" color="blue">
            <template #label>
                <p class="font-normal">
                    Prihvaćam i slažem se sa
                    <NuxtLink to="/opci-uvjeti" class="link-plavi body4 underline font-semibold"
                        >uvjetima prodaje</NuxtLink
                    >
                    i
                    <NuxtLink to="/zastita-podataka" class="link-plavi body4 underline font-semibold"
                        >pravilima privatnosti</NuxtLink
                    >
                    <span class="text-red-500">&nbsp;*</span>
                </p>
            </template>
        </UCheckbox>

        <p v-if="termMessage != ''" class="text-sm italic font-medium text-red-500">{{ termMessage }}</p>

        <UButton
            block
            :disabled="loadingForm"
            :loading="loadingForm"
            @click="submitForm"
            id="btn-order-and-pay"
            data-location="cart-total-checkout"
            class="w-full px-5 py-3 mt-4 font-bold text-white uppercase rounded-lg"
            style="background: linear-gradient(79.46deg, #0083c9 3.18%, #58b6e7 107.55%)"
        >
            naruči i plati
        </UButton>
    </div>
</template>

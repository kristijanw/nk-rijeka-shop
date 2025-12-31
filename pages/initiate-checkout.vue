<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { useCartStore } from '~/composables/useCart'
import type { IUser } from '~/types/user'
useSeoMeta({
    title: 'Košarica',
})

const user = useSanctumUser() as Ref<IUser | null>
const { api } = useAxios()
const toast = useToast()
const cartStore = useCartStore()

const applyCoupon = (coupon: string) => {
    api.post('/check-coupon', { coupon })
        .then(({ data }) => {
            if (data.status != 'error') {
                cartStore.addCoupon(data)

                toast.add({
                    title: 'Kupon uspješno primljen!',
                    color: 'green',
                    timeout: 3000,
                })
            }
        })
        .catch((err) => {
            toast.add({
                title: 'Error',
                description: err.response.data.message,
                color: 'red',
                timeout: 3000,
            })
        })
}

const loadingForm = ref<boolean>(false)

const selectedPaymentMethod = ref('card')
const paymentMethods = [
    { label: 'Plaćanje pouzećem', value: 'cod', icon: 'heroicons:banknotes' },
    { label: 'Kreditna ili debitna kartica', value: 'card', icon: 'heroicons:credit-card' },
]

const formRef = ref()
const terms = ref(false)
const termValidationMessage = ref('')

const updateTerms = () => {
    terms.value = !terms.value
}

const schema = z
    .object({
        firstName: z.string({ required_error: 'Ime je obavezan podatak' }).min(1, 'Ime je obavezan podatak'),
        lastName: z.string({ required_error: 'Prezime je obavezan podatak' }).min(1, 'Prezime je obavezan podatak'),
        company: z.string().optional(),
        country: z.string({ required_error: 'Država je obavezan podatak' }).min(1, 'Država je obavezan podatak'),
        city: z.string({ required_error: 'Grad je obavezan podatak' }).min(1, 'Grad je obavezan podatak'),
        zipCode: z
            .string({ required_error: 'Poštanski broj je obavezan podatak' })
            .min(1, 'Poštanski broj je obavezan podatak'),
        address: z.string({ required_error: 'Adresa je obavezan podatak' }).min(1, 'Adresa je obavezan podatak'),
        phone: z.string({ required_error: 'Telefon je obavezan podatak' }).min(1, 'Telefon je obavezan podatak'),
        email: z.string({ required_error: 'Email je obavezan podatak' }).email('Pogrešna email adresa'),
        orderNote: z.string().optional(),

        anotherAddress: z.boolean(),
        anotherCompany: z.string().optional(),
        anotherCountry: z.string().optional(),
        anotherCity: z.string().optional(),
        anotherZipCode: z.string().optional(),
        anotherStreetAddress: z.string().optional(),
        anotherPhone: z.string().optional(),
    })
    .refine(
        (data) => {
            if (!data.anotherAddress) return true

            return !!(
                data.anotherCountry?.length &&
                data.anotherCity?.length &&
                data.anotherZipCode?.length &&
                data.anotherStreetAddress?.length
            )
        },
        {
            message:
                "Država, grad, poštanski broj i adresa su obavezni podaci kada je uključena opcija 'Dostavi na drugu adresu'",
            path: ['anotherAddress'],
        }
    )

type Schema = z.output<typeof schema>

const state = reactive({
    firstName: user.value?.name?.split(' ')[0] || '',
    lastName: user.value?.name?.split(' ')[1] || '',
    company: user.value?.address?.company || '',
    country: user.value?.address?.state || '',
    city: user.value?.address?.city || '',
    zipCode: user.value?.address?.zip || '',
    address: user.value?.address?.address || '',
    phone: user.value?.address?.phone || '',
    email: user.value?.email || '',
    orderNote: undefined,

    anotherAddress: false,
    anotherCompany: undefined,
    anotherCountry: undefined,
    anotherCity: undefined,
    anotherZipCode: undefined,
    anotherStreetAddress: undefined,
})

// helper: detektiraj Hrvatsku i slične zapise
const isCroatia = computed(() => {
    const c = (state.country || '').toLowerCase().trim()
    if (!c) return false
    // podržane varijante unosa
    if (c.includes('hr')) return true
    return ['hr'].includes(c)
})

const paymentOptions = computed(() => {
    // sakrij COD ako nije HR ili ako košarica sadrži personalizaciju
    return !isCroatia.value || cartStore.cartHasPersonalization
        ? paymentMethods.filter((m) => m.value === 'card')
        : paymentMethods
})

watch(
    [() => state.country, () => state.anotherCountry, () => cartStore.cartHasPersonalization],
    (val) => {
        if (!isCroatia.value || cartStore.cartHasPersonalization) {
            selectedPaymentMethod.value = 'card'
        }

        cartStore.setDestinationCountry(val[0] || 'HR')

        if (val[1] !== undefined) {
            cartStore.setDestinationCountry(val[1])
        }
    },
    { immediate: true }
)

watch(
    () => state.anotherAddress,
    (val) => {
        if (!val) {
            state.anotherCountry = undefined
            state.anotherCity = undefined
            state.anotherZipCode = undefined
            state.anotherStreetAddress = undefined
            state.anotherCompany = undefined
        }
    }
)

const submitForm = () => formRef.value?.submit()

const config = useRuntimeConfig()

async function handleOnSubmit(event: FormSubmitEvent<Schema>) {
    termValidationMessage.value = ''
    if (!terms.value) {
        termValidationMessage.value = 'Ovo polje je obavezno'
        return
    }

    loadingForm.value = true

    const params = {
        user: user.value != null ? user.value : null,
        data: event.data,
        delivery: cartStore.selectedDeliveryOption,
        priceOfDelivery: cartStore.deliveryPrice,
        items: cartStore.cart_products,
        total: cartStore.totalPriceQuantity.total.toFixed(2),
        totalWithDelivery: cartStore.totalPriceWithDelivery.toFixed(2),
        paymentMethod: selectedPaymentMethod.value,
    }

    api.post('/create-orders', { ...params })
        .then(({ data }) => {
            if (data.status != 'error') {
                if (params.paymentMethod == 'card') {
                    window.location.href = `${config.public.baseUrl}/pay/${data.order_id}`
                } else {
                    navigateTo('/thank-you')
                }
            } else {
                toast.add({
                    title: 'greška, javite se korisničkoj podršci.',
                    color: 'red',
                    timeout: 3000,
                })
            }

            loadingForm.value = false
        })
        .catch((err) => {
            toast.add({
                title: err.response.data.message,
                color: 'red',
                timeout: 3000,
            })

            loadingForm.value = false
        })
}
</script>

<template>
    <div class="bg-igraci">
        <div class="container mx-auto con-height pb-5 px-5">
            <!-- Breadcrumb -->
            <p class="font-normal text-blue-900 font-roboto text-body2">
                <NuxtLink class="text-blue-400 link-color" to="/">Početna / </NuxtLink>
                <span>Košarica</span>
            </p>
            <p class="pt-1 pb-8 text-h1-normal font-medium uppercase text-blue-900 font-saira">Košarica</p>

            <div v-if="cartStore.cart_products.length > 0" class="grid grid-cols-12 gap-4">
                <div class="col-span-12">
                    <h2 class="font-medium text-blue-900 font-saira text-h2-normal">Trenutna narudžba</h2>
                </div>
                <div class="col-span-12 md:col-span-7 h-fit">
                    <CartListProducts />

                    <h2 class="pt-8 pb-4 font-medium text-blue-900 font-saira text-h2-normal">Adresa za naplatu</h2>

                    <div class="md:px-12 md:py-10 py-5 px-3 bg-white rounded-2xl">
                        <h2 class="text-xl font-bold text-blue-900 font-saira">Podaci o kupcu</h2>

                        <div class="w-full pt-4">
                            <UForm ref="formRef" @submit="handleOnSubmit" :schema="schema" :state="state">
                                <CartBillingForm :form="state" />
                            </UForm>
                        </div>
                    </div>

                    <h2 class="pt-8 pb-4 font-medium text-blue-900 font-saira text-h2-normal">Vrsta plaćanja</h2>

                    <div class="md:px-12 md:py-10 py-5 px-3 bg-white rounded-2xl">
                        <!-- <h2 class="text-xl font-bold text-blue-900 font-saira">Kartično plaćanje</h2> -->

                        <div class="w-full pt-4">
                            <URadioGroup
                                color="blue"
                                v-model="selectedPaymentMethod"
                                :options="paymentOptions"
                                :ui="{ fieldset: 'w-full flex flex-col' }"
                                :uiRadio="{
                                    label: 'cursor-pointer py-3',
                                    wrapper:
                                        'px-2 rounded-md mb-2 items-center hover:bg-blue-100 border border-[#C2CDD6]',
                                    inner: 'w-full',
                                    form: 'cursor-pointer',
                                }"
                            >
                                <template #label="{ option }">
                                    <div class="flex items-center justify-between w-full">
                                        <p class="text-[#6B7280]">{{ option.label }}</p>
                                        <UIcon :name="option.icon" class="w-6 h-6 text-[#6B7280]" />
                                    </div>
                                </template>
                            </URadioGroup>

                            <p v-if="!isCroatia" class="text-sm text-gray-500 mt-2">
                                Plaćanje pouzećem dostupno je samo za narudžbe u Hrvatskoj.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 md:col-span-5">
                    <CartTotal
                        @useCoupon="applyCoupon"
                        @selectedDelivery="cartStore.changeDelivery"
                        :submitForm="submitForm"
                        :term="updateTerms"
                        :termMessage="termValidationMessage"
                        :loadingForm="loadingForm"
                    />
                </div>
            </div>
            <div v-else class="flex flex-col justify-center items-center py-20">
                <h1 class="text-2xl font-medium uppercase text-blue-900 font-saira mb-4">Košarica je prazna</h1>
                <p class="text-gray-500">Dodaj proizvode u košaricu da bi nastavili s kupnjom</p>
                <a
                    href="/p/"
                    id="btn-continue-shopping"
                    data-location="cart-empty-continue-shopping"
                    class="font-semibold btn-primary large uppercase active:bg-blue-800 mt-5"
                    >Nastavi s kupnjom</a
                >
            </div>
        </div>
    </div>
</template>

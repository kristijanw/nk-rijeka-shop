<script setup lang="ts">
import { useCartStore } from '~/composables/useCart'
import type { IProduct } from '~/types/product'
import { useRouter } from 'vue-router'
import type { IUser } from '~/types/user'
import { useFavoritesStore } from '~/composables/favorites'

const props = defineProps<{
    product: IProduct
    newProducts?: IProduct[]
}>()

const selectedVariation = computed(() => props.product.variations?.[0] ?? null)

const productTags = useProductTags(props.product)
const router = useRouter()
const toast = useToast()
const user = useSanctumUser() as Ref<IUser | null>

const favoriteStore = useFavoritesStore()

const cartStore = useCartStore()

const addToCart = () => {
    cartStore.addCartProduct(props.product, undefined, false, user.value?.role ?? 'guest')

    toast.add({
        icon: 'solar:check-circle-broken',
        title: `Proizvod "${props.product.title}" je uspješno dodan u vašu košaricu.`,
        description: `Kliknite ovdje za pregled košarice`,
        color: 'green',
        click: () => {
            router.push('/initiate-checkout/')
        },
    })
}
</script>

<template>
    <div class="relative transition-all duration-500 frame group hover:-translate-y-3">
        <div
            class="card overflow-hidden flex flex-col justify-between text-center relative transition-shadow duration-500 group-hover:shadow-[0px_10px_15px_0px_#0000001A]"
        >
            <div>
                <div class="flex flex-row items-center justify-between">
                    <div v-if="favoriteStore.isFavorite(props.product)">
                        <Icon
                            @click="favoriteStore.removeFavoriteProduct(props.product)"
                            name="material-symbols:favorite"
                            class="text-blue-500 icon-xl"
                        />
                    </div>
                    <div v-else>
                        <Icon
                            @click="favoriteStore.addFavoriteProduct(props.product)"
                            name="material-symbols:favorite-outline"
                            class="text-gray-900 icon-xl"
                        />
                    </div>
                    <div class="flex gap-2">
                        <p
                            v-for="tag in productTags"
                            :key="tag.label"
                            :class="[
                                'px-2 py-1 md:px-3 md:py-2 font-semibold text-white rounded-lg tags font-saira text-label2 md:text-label1 radius',
                                tag.color,
                            ]"
                        >
                            {{ tag.label }}
                        </p>
                    </div>
                </div>

                <img :src="product.gallery[0]" alt="product thumb" class="max-h-[320px] max-w-[85%] mx-auto" />
            </div>

            <div class="flex flex-row justify-center gap-2 pt-6">
                <p
                    :class="[
                        'font-bold text-blue-900 font-saira text-[15px] sm:text-h6-normal',
                        product.price_discount ? 'line-through' : '',
                    ]"
                >
                    {{ product.price.toFixed(2).replace('.', ',') }} €
                </p>
                <span class="font-bold text-blue-900 font-saira text-[15px] sm:text-h6-normal">|</span>

                <div v-if="product.price_discount">
                    <p class="font-bold text-blue-500 font-saira text-[15px] sm:text-h6-normal">
                        {{ product.price_discount.toFixed(2).replace('.', ',') }} €
                    </p>
                </div>
                <div v-else class="flex items-center justify-center gap-1 sm:gap-2 mt-[-5px]">
                    <p class="font-bold text-blue-500 font-saira text-[15px] sm:text-h6-normal">
                        {{ product.member_price.toFixed(2).replace('.', ',') }} €
                    </p>

                    <UPopover
                        :popper="{
                            placement: 'top',
                            strategy: 'absolute',
                            modifiers: [
                                {
                                    name: 'preventOverflow',
                                    options: {
                                        boundary: 'clippingParents',
                                    },
                                },
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 6],
                                    },
                                },
                            ],
                        }"
                        :ui="{
                            ring: 'ring-0',
                            background: 'dark:bg-blue-50 bg-blue-50',
                            container: 'z-50 w-[110px]', // ← direktno kontrolira širinu!
                        }"
                    >
                        <UButton
                            trailing-icon="mynaui:info-hexagon"
                            class="bg-white shadow-none hover:bg-white text-blue-500 p-0 mt-[6px]"
                        />
                        <template #panel>
                            <div class="px-3 py-2 text-center">
                                <p class="font-bold text-gray-900 font-roboto text-body4">Cijena za članove</p>
                            </div>
                        </template>
                    </UPopover>
                </div>
            </div>

            <div class="transition-opacity duration-300 opacity-0 middle group-hover:opacity-100">
                <NuxtLink
                    :to="`/p/${product.id}/`"
                    class="font-semibold btn-primary large active:bg-blue-800 sm:text-[15px] text-[10px]"
                >
                    {{ product.variations?.length > 0 ? 'ODABERI OPCIJE' : 'POGLEDAJ VIŠE' }}
                </NuxtLink>

                <div
                    v-if="
                        product.variations?.length &&
                        product.variations?.reduce((sum, variation) => sum + variation.quantity, 0) <= 0
                    "
                    class="bg-red-500 font-saira font-semibold text-white rounded-md py-2 sm:text-[15px] text-[10px]"
                >
                    RASPRODANO
                </div>
                <div
                    v-if="product.variations?.length === 0 && product.quantity <= 0"
                    class="bg-red-500 font-saira font-semibold text-white rounded-md py-2 sm:text-[15px] text-[10px]"
                >
                    RASPRODANO
                </div>

                <UButton
                    v-if="product.variations?.length < 1 && product.quantity_sum > 0"
                    @click="addToCart"
                    size="lg"
                    variant="solid"
                    :ui="{
                        base: 'text-white font-saira font-semibold',
                        variant: {
                            solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800',
                        },
                    }"
                    id="btn-add-to-cart"
                    data-location="product-card-add-to-cart"
                    class="sm:text-[15px] text-[10px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold"
                >
                    DODAJ U KOŠARICU
                </UButton>
            </div>
        </div>
        <p class="p-2 mt-2 font-semibold text-center text-blue-900 font-saira text-h5-normal">{{ product.title }}</p>
    </div>
</template>

<style scoped>
.middle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.5s ease;
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 60%;
}
</style>

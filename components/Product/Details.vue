<script setup lang="ts">
import type { IProduct } from '~/types/product'
import type { ICategory } from '~/types/category'
import { useCartStore } from '~/composables/useCart'
import Gallery from './Gallery.vue'
import { SidebarPersonalize } from '#components'
import { useRouter } from 'vue-router'
import type { IUser } from '~/types/user'
import ProductBreadcrumbs from '@/components/Product/Breadcrumbs.vue'
import OutOfStockNotification from '@/components/Product/OutOfStockNotification.vue'

const props = defineProps<{ product: IProduct }>()

const productTags = useProductTags(props.product)

const user = useSanctumUser() as Ref<IUser | null>

const router = useRouter()
const toast = useToast()

const cartStore = useCartStore()
const selectedVariationId = ref<number | null>(null)

const updateSelectedVariation = (id: number | null) => {
    selectedVariationId.value = id
}

const selectedVariation = computed(() => {
    return props.product.variations?.find((variation) => variation.id === selectedVariationId.value) || null
})

const isInCategory2 = computed(() => {
    return props.product.category?.some((cat) => cat.id === 2)
})

const addToCart = () => {
  if (props.product.variations && props.product.variations.length && selectedVariationId.value === null) {
    alert('Molimo odaberite veličinu prije dodavanja u košaricu.')
    return
  }

  const ok = cartStore.addCartProduct(
    props.product,
    selectedVariationId.value ?? undefined,
    undefined,
    user.value?.role ?? 'guest'
  )

  //store vraća false ako se prođe količina zalihe
  if (ok === false) {
    const stock = selectedVariation.value?.quantity ?? props.product.quantity ?? 0

    const existing = cartStore.cart_products
        .filter((p: any) => p.id === props.product.id && (p.variationId ?? null) === (selectedVariationId.value ?? null))
        .reduce((s: number, p: any) => s + Number(p.orderQuantity ?? 0), 0)

    let message = `Na zalihi je ${stock} kom.`

    if (existing > 0) {
        message += `\nU košarici već imaš ${existing}.`
    }

    message += `\nNe možeš dodati više.`

    alert(message)
    return
    }

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

onMounted(() => {
    if (props.product.variations && props.product.variations.length > 0) {
        selectedVariationId.value = props.product.variations[0].id
        cartStore.setInitialOrderQuantity(props.product.variations[0].minimum_quantity)
    }
})

watch(
    [selectedVariation],
    (newVariation) => {
        if (selectedVariation.value?.minimum_quantity) {
            cartStore.setInitialOrderQuantity(selectedVariation.value?.minimum_quantity)
        }
    },
    { deep: true }
)

/* SHARE PRODUCT */
//Dohvati trenutni URL proizvoda
import { useRoute, useRuntimeConfig } from 'nuxt/app'
const route = useRoute()
const config = useRuntimeConfig()

const currentUrl = computed(() => {
    return `${config.public.siteUrl}${route.fullPath}`
})

const facebookShare = computed(
    () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`
)

const twitterShare = computed(
    () =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}&text=${encodeURIComponent(
            props.product.title
        )}`
)
</script>

<template>
    <div class="container mx-auto px-5 pt-32 pb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 pt-5 lg:pt-32">
            <!-- PRVI STUPAC: Product Gallery -->
            <div class="p-5 bg-white border border-neutralBlue-100 h-fit rounded-lg">
                <div class="flex flex-row items-center justify-between">
                    <div v-if="useFavoritesStore().isFavorite(props.product)">
                        <Icon
                            @click="useFavoritesStore().removeFavoriteProduct(props.product)"
                            name="material-symbols:favorite"
                            class="text-blue-500 icon-xl"
                        />
                    </div>
                    <div v-else>
                        <Icon
                            @click="useFavoritesStore().addFavoriteProduct(props.product)"
                            name="material-symbols:favorite-outline"
                            class="text-gray-900 icon-xl"
                        />
                    </div>
                    <div class="flex gap-2" v-if="productTags.length">
                        <p
                            v-for="tag in productTags"
                            :key="tag.label"
                            :class="[
                                'px-3 py-2 font-semibold text-white rounded-lg tags font-saira text-label1 radius',
                                tag.color,
                            ]"
                        >
                            {{ tag.label }}
                        </p>
                    </div>
                </div>
                <Gallery :product="product" />
            </div>

            <!-- DRUGI STUPAC: Product Details-->
            <div class="lg:px-7 lg:pb-7 px-0 pt-10 lg:pt-0">
                <ProductBreadcrumbs :product="product" />

                <h1 class="my-6 font-medium text-blue-900 font-saira text-h1-normal">{{ product.title }}</h1>

                <div v-if="product.description">
                    <p class="text-gray-900 font-roboto fontnormal text-body2">
                        <span class="font-bold">Opis: </span>
                    </p>
                    <p class="text-white font-montserrat" v-html="product.description"></p>
                </div>

                <!--CIJENA-->
                <div v-if="product.variations && product.variations.length">
                    <div v-if="selectedVariation" class="flex flex-col gap-3 my-7 py-7 border-y border-neutralBlue-100">
                        <div v-if="selectedVariation.price_discount" class="flex flex-col gap-3">
                            <div class="flex flex-row border-[1.4px] border-blue-900 rounded-lg w-fit">
                                <p class="font-semibold text-blue-900 font-saira text-h5-normal px-4 py-2">
                                    {{ selectedVariation.price.toFixed(2).replace('.', ',') }} €
                                </p>
                                <p
                                    class="flex items-center px-3 py-1 font-bold text-white uppercase bg-gray-900 rounded-r-md font-saira text-label1"
                                >
                                    REDOVNA CIJENA
                                </p>
                            </div>

                            <div
                                v-if="selectedVariation.price_discount"
                                class="flex flex-row border-[1.4px] border-blue-300 rounded-lg w-fit"
                            >
                                <p class="font-semibold text-blue-300 font-saira text-h5-normal px-4 py-2">
                                    {{ selectedVariation.price_discount.toFixed(2).replace('.', ',') }} €
                                </p>
                                <p
                                    class="flex items-center px-3 py-1 font-bold text-white uppercase bg-blue-300 rounded-r-md font-saira text-label1"
                                >
                                    AKCIJSKA CIJENA
                                </p>
                            </div>
                        </div>
                        <div v-else class="flex flex-col gap-3">
                            <div class="flex flex-row border-[1.4px] border-blue-900 rounded-lg w-fit">
                                <p class="font-semibold text-blue-900 font-saira text-h5-normal px-4 py-2">
                                    {{ selectedVariation.price.toFixed(2).replace('.', ',') }} €
                                </p>
                                <p
                                    class="flex items-center px-3 py-1 font-bold text-white uppercase bg-gray-900 rounded-r-md font-saira text-label1"
                                >
                                    REDOVNA CIJENA
                                </p>
                            </div>
                            <div class="flex flex-row border-[1.4px] border-blue-300 rounded-lg w-fit">
                                <p class="font-semibold text-blue-300 font-saira text-h5-normal px-4 py-2">
                                    {{ selectedVariation.member_price.toFixed(2).replace('.', ',') }} €
                                </p>
                                <p
                                    class="flex items-center px-3 py-1 font-bold text-white uppercase bg-blue-300 rounded-r-md font-saira text-label1"
                                >
                                    CIJENA ZA ČLANOVE
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="flex flex-col gap-3 my-7 py-7 border-y border-neutralBlue-100">
                    <div class="flex flex-row border-[1.4px] border-blue-900 rounded-lg w-fit">
                        <p class="font-semibold text-blue-900 font-saira text-h5-normal px-4 py-2">
                            {{ product.price.toFixed(2).replace('.', ',') }} €
                        </p>
                        <p
                            class="flex items-center px-3 py-1 font-bold text-white uppercase bg-gray-900 rounded-r-md font-saira text-label1"
                        >
                            REDOVNA CIJENA
                        </p>
                    </div>

                    <div
                        v-if="product.price_discount"
                        class="flex flex-row border-[1.4px] border-blue-300 rounded-lg w-fit"
                    >
                        <p class="font-semibold text-blue-300 font-saira text-h5-normal px-4 py-2">
                            {{ product.price_discount.toFixed(2).replace('.', ',') }} €
                        </p>
                        <p
                            class="flex items-center px-3 py-1 font-bold text-white uppercase bg-blue-300 rounded-r-md font-saira text-label1"
                        >
                            AKCIJSKA CIJENA
                        </p>
                    </div>
                    <div v-else class="flex flex-row border-[1.4px] border-blue-300 rounded-lg w-fit">
                        <p class="font-semibold text-blue-300 font-saira text-h5-normal px-4 py-2">
                            {{ product.member_price.toFixed(2).replace('.', ',') }} €
                        </p>
                        <p
                            class="flex items-center px-3 py-1 font-bold text-white uppercase bg-blue-300 rounded-r-md font-saira text-label1"
                        >
                            CIJENA ZA ČLANOVE
                        </p>
                    </div>
                </div>

                <div class="border-b border-neutralBlue-100">
                    <!-- Personaliziraj -->
                    <div v-if="product.variations && product.variations.length">
                        <div
                            v-if="
                            product.personalization_enable &&
                            isInCategory2 &&
                            (
                                !!product.personalization_name ||
                                !!product.personalization_number ||
                                !!product.personalization_logo
                            )
                            "
                        >
                            <SidebarPersonalize
                            :product="product"
                            :selectedVariationId="selectedVariationId"
                            @update-selected-variation="updateSelectedVariation"
                            />
                        </div>

                        <!-- Veličina -->
                        <div class="pt-7">
                            <p class="font-bold text-gray-900 font-saira text-h6-normal">Veličina</p>

                            <div class="flex flex-wrap flex-row gap-1 py-3">
                                <button
                                    v-for="variation in product.variations"
                                    :key="variation.id"
                                    :class="[
                                        'btn-variations',
                                        'xl',
                                        'btn-size',
                                        'w-fit',
                                        {
                                            'active-variation': selectedVariationId === variation.id,
                                            'hover:bg-blue-50': selectedVariationId !== variation.id,
                                        },
                                    ]"
                                    @click="updateSelectedVariation(variation.id)"
                                >
                                    {{ variation.packaging }}
                                </button>
                            </div>

                            <NuxtLink
                                to="/tablica-velicina"
                                class="font-normal text-gray-900 underline font-roboto text-body2 link-plavi"
                            >
                                Pogledajte tablicu veličina
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="mt-7 pb-7">
                        <!--Količina-->
                        <div v-if="product.variations && product.variations.length">
                            <div v-if="selectedVariation && selectedVariation.quantity <= 0">
                                <div
                                    class="bg-red-500 text-label1 font-saira font-semibold text-white rounded-lg py-3 px-5 w-fit"
                                >
                                    RASPRODANO
                                </div>
                                <OutOfStockNotification :productId="product.id" :variationId="selectedVariationId" />
                            </div>
                            <div v-else class="flex items-center gap-4">
                                <div class="flex items-center gap-1">
                                    <button
                                        class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
                                        @click="cartStore.decrement(selectedVariation?.minimum_quantity || 1)"
                                    >
                                        <UIcon name="heroicons:minus" />
                                    </button>
                                    <input
                                        class="bg-white border-blue-300 border-[1.4px] square-large rounded-lg text-center"
                                        type="text"
                                        :min="selectedVariation?.minimum_quantity || 1"
                                        :value="cartStore.orderQuantity"
                                        disabled
                                    />
                                    <button
                                        class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
                                        @click="cartStore.increment()"
                                    >
                                        <UIcon name="heroicons:plus" />
                                    </button>
                                </div>

                                <UButton
                                    @click="addToCart"
                                    size="lg"
                                    variant="solid"
                                    :ui="{
                                        base: 'text-white font-saira font-semibold',
                                        variant: {
                                            solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800',
                                        },
                                    }"
                                    class="px-5 uppercase text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold"
                                >
                                    Dodaj u košaricu
                                    <Icon name="streamline:shopping-cart-1" class="text-white icon-medium" />
                                </UButton>
                            </div>
                        </div>
                        <div v-else>
                            <div v-if="product.quantity == 0">
                                <div
                                    class="bg-red-500 text-label1 font-saira font-semibold text-white rounded-lg py-3 px-5 w-fit"
                                >
                                    RASPRODANO
                                </div>
                                <OutOfStockNotification :productId="product.id" />
                            </div>

                            <div v-else class="flex items-center gap-4">
                                <div class="flex items-center gap-1">
                                    <button
                                        class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
                                        @click="cartStore.decrement(product.minimum_quantity || 1)"
                                    >
                                        <UIcon name="heroicons:minus" />
                                    </button>
                                    <input
                                        class="bg-white border-blue-300 border-[1.4px] square-large rounded-lg text-center"
                                        type="text"
                                        :min="product.minimum_quantity"
                                        :value="cartStore.orderQuantity"
                                        disabled
                                    />
                                    <button
                                        class="btn-icon-secondary square-large rounded-md flex items-center justify-center border-[1.4px]"
                                        @click="cartStore.increment()"
                                    >
                                        <UIcon name="heroicons:plus" />
                                    </button>
                                </div>

                                <UButton
                                    @click="addToCart"
                                    size="lg"
                                    variant="solid"
                                    :ui="{
                                        base: 'text-white font-saira font-semibold',
                                        variant: {
                                            solid: 'bg-blue-600 hover:bg-blue-700 active:bg-800',
                                        },
                                    }"
                                    class="px-5 uppercase text-[15px] flex justify-center focus:outline-none focus:ring-0 active:bg-blue-800 transition-colors duration-200 font-saira font-semibold"
                                >
                                    Dodaj u košaricu
                                    <Icon name="streamline:shopping-cart-1" class="text-white icon-medium" />
                                </UButton>
                            </div>
                        </div>
                    </div>
                </div>

                <!--OSTALO-->
                <div class="pt-7">
                    <p class="pb-3 text-gray-900 font-roboto fontnormal text-body2">
                        <span class="font-bold"> Šifra: </span>{{ product.sku }}
                    </p>
                    <p
                        class="text-gray-900 font-roboto fontnormal text-body2"
                        v-if="product.category && product.category.length"
                    >
                        <span class="font-bold"> Kategorije: </span>
                        <span v-for="(cat, index) in product.category" :key="cat.id">
                            <router-link :to="`/c/${cat.slug}`" class="link-color">
                                {{ cat.title }}
                            </router-link>
                            <span v-if="index < product.category.length - 1">, </span>
                        </span>
                    </p>
                </div>

                <div class="pt-6 pb-7">
                    <p class="font-normal text-blue-900 font-roboto text-body3">
                        * Personalizacija dresova i hlačica tiska se po fontu sezone 2026/27<br /><br />
                        * Molimo da prilikom preuzimanja pošiljke, u prisustvu djelatnika Hrvatske pošte, utvrdite
                        eventualna oštećenja ili manjkavost.
                    </p>
                </div>

                <div
                    class="flex md:flex-col flex-row justify-end md:justify-start md:gap-0 gap-3 md:items-left items-center md:items-start"
                >
                    <p class="font-bold text-gray-900 font-saira text-h6-normal">Podijeli</p>
                    <ul class="inline-flex gap-2 md:mt-2">
                        <li>
                            <a class="circle-page" :href="facebookShare" target="_blank" rel="noopener">
                                <Icon name="brandico:facebook" class="text-white icon-small" />
                            </a>
                        </li>
                        <li>
                            <a class="circle-page" :href="twitterShare" target="_blank" rel="noopener">
                                <Icon name="garden:twitter-stroke-12" class="text-white icon-xs" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    max-width: 400px;
}
</style>

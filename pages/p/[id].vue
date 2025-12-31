<script setup lang="ts">
import { type IProduct } from '@/types/product'

const config = useRuntimeConfig()

const { id } = useRoute().params
const uri = `${config.public.url}/products/${id}`

const { data: product, error } = await useFetch<IProduct>(uri, {
    key: `product-${id}`,
})

// If product have status draft redirect to 404
if (product.value?.status === 'draft') {
    throw createError({
        statusCode: 404,
        statusMessage: 'Proizvod nije dostupan',
    })
}
</script>

<template>
    <div v-if="product != null">
        <!--adding custom page meta (second way)-->

        <Head>
            <Title> NK Rijeka | {{ product?.title }} </Title>
            <Meta name="description" :content="product?.description" />
        </Head>

        <ProductDetails :product />

        <ProductRelated :product />
    </div>
</template>

<style scoped></style>

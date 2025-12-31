<script setup lang="ts">
import { useProductsByCategory } from '~/composables/useProductsByCategory'

//Bestselleri (id 33)
const { products: bestsellerProducts, loading: loadingBestsellers } = useProductsByCategory(33)
const carouselBest = ref()

//Novo u ponudi (id 34)
const { products: newProducts, loading: loadingNew } = useProductsByCategory(34)

const carouselNew = ref()
onMounted(() => {
    const initCarousel = (carouselRef: any) => {
        setInterval(() => {
            if (!carouselRef.value) return
            if (carouselRef.value.page === carouselRef.value.pages) {
                return carouselRef.value.select(0)
            }
            carouselRef.value.next()
        }, 3000)
    }
})

/*search*/
const router = useRouter()
const searchTerm = ref('')

const submitSearch = () => {
    if (searchTerm.value.trim()) {
        router.push({ path: '/search', query: { q: searchTerm.value.trim() } })
    }
}
</script>

<template>
    <div class="px-0 sm:px-5 bg-top bg-no-repeat bg-auto pt-32 lg:pt-72 pb-74 bg-home1 bg-players">
        <div class="container mx-auto xl:max-w-[1120px] relative z-[1] px-0 sm:px-5 xl:px-2">
            <div class="w-full lg:w-1/2">
                <img src="~/assets/images/players-home.png" class="block lg:hidden pb-5" />
                <div class="px-5 sm:px-0">
                    <h1 class="font-bold font-saira text-h1-display text-neutralBlue-950">POGLEDAJ NOVE DRESOVE</h1>
                    <p class="mt-2 mb-6 font-normal text-gray-900 font-roboto text-body1">
                        Prepoznatljiv dizajnerski potpis Juraja Zigmana <br class="hidden sm:block" />
                        ponovno donosi svježinu i inovaciju našim dresovima.
                    </p>
                    <a
                        href="/c/dresovi/2025-2026/"
                        id="btn-buy-now"
                        data-location="home-banner"
                        class="uppercase btn-primary large"
                    >
                        Kupi sad
                    </a>
                </div>
            </div>

            <div class="relative z-10 grid grid-cols-1 gap-2 sm:gap-6 lg:grid-cols-3 pt-12 lg:pt-52 px-5 sm:px-0">
                <a
                    href="/c/dresovi/2025-2026"
                    class="group relative bg-dresovi bg-cover bg-center rounded-lg h-72 lg:h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"
                    ></div>
                    <p class="relative font-bold text-blue-300 font-saira text-h6-normal text-center">DRESOVI</p>
                    <h2 class="relative font-bold text-white font-saira text-h3-normal text-center">2025./26.</h2>
                </a>

                <a
                    href="/c/forza-fiume-premium"
                    class="group relative bg-odjeca bg-cover bg-center rounded-lg h-80 lg:h-[522px] flex flex-col justify-end items-center py-7 px-1 transition-transform duration-300 ease-in-out hover:-translate-y-4"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"
                    ></div>
                    <p class="relative font-bold text-blue-300 font-saira text-h6-normal text-center">ODJEĆA</p>
                    <h2 class="relative font-bold text-white font-saira text-h3-normal text-center">FORZA FIUME KOLEKCIJA</h2>
                </a>

                <a
                    href="/c/pokloni/skolski-asortiman"
                    class="group relative bg-pokloni bg-cover bg-center rounded-lg h-80 lg:h-[522px] flex flex-col justify-end items-center p-7 transition-transform duration-300 ease-in-out hover:-translate-y-4"
                >
                    <div
                        class="absolute inset-0 bg-gradient-to-b from-transparent to-[#012436] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg"
                    ></div>
                    <p class="relative font-bold text-blue-300 font-saira text-h6-normal text-center">POKLONI</p>
                    <h2 class="relative font-bold text-white font-saira text-h3-normal text-center">
                        ŠKOLSKI ASORTIMAN
                    </h2>
                </a>
            </div>
        </div>
    </div>

    <div class="bg-home2 pt-20 mt-[-80px]">
        <!-- Vertikalni divider -->
        <div class="relative w-px mx-auto my-20 bg-blue-700 h-14"></div>

        <div class="container mx-auto px-5 sm:px-5">
            <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="flex flex-col gap-2 md:flex-row md:gap-9">
                    <div class="flex flex-row justify-between items-center">
                        <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">BESTSELLERI</h1>
                        <a
                            href="/c/bestselleri/"
                            id="btn-mobile-view-all-bestsellers"
                            data-location="home-mobile-bestsellers"
                            class="uppercase btn-secondary xs h-fit md:hidden"
                        >
                            Pogledaj sve
                        </a>
                    </div>
                    <p class="font-normal text-blue-900 font-roboto text-body1">
                        Počasti se novim dresom, odaberi atraktivan <br />poklon, ne propusti promotivne cijene...
                    </p>
                </div>
                <a
                    href="/c/bestselleri/"
                    id="btn-desktop-view-all-bestsellers"
                    data-location="home-desktop-bestsellers"
                    class="uppercase btn-secondary xs h-fit hidden md:block self-center"
                >
                    Pogledaj sve
                </a>
            </div>

            <div v-if="bestsellerProducts.length > 0">
                <Carousel :products="bestsellerProducts" class="pt-6" />
            </div>
            <div v-else class="text-center text-blue-900 font-roboto pt-12">NEMA PROIZVODA U OVOJ KATEGORIJI</div>
        </div>

        <!--PERSONALIZIRAJ dekstop -->
        <div class="relative mx-3 my-40 md:container md:mx-auto px-5 hidden md:block">
            <div class="bg-dark-blue-gradient2 p-20 rounded-2xl xl:max-w-[980px] w-full">
                <h1 class="mb-2 font-bold uppercase font-saira text-h2-display text-blue-50">
                    PERSONALIZIRAJ <br />SVOJ DRES
                </h1>
                <p class="font-normal text-white font-roboto text-body1 mb-7">
                    Tvoj dres, tvoja pravila. Personaliziraj svoj <br />omiljeni dres i učini ga jedinstvenim.
                </p>
                <NuxtLink to="/c/2025-2026" class="uppercase btn-primary small">Naruči svoj dres</NuxtLink>
            </div>
            <img
                class="absolute right-0 w-[45%] top-[12%] lg:w-[53%] lg:top-[-3%] xl:w-auto xl:top-[-20%]"
                src="~/assets/images/dresovi.png"
                alt="Dresovi"
            />
        </div>

        <!--PERSONALIZIRAJ mobile -->
        <div class="relative mb-20 mt-36 block md:hidden">
            <img class="-mt-20 w-full -mb-72 block sm:hidden" src="~/assets/images/dresovi.png" alt="Dresovi" />
            <div
                class="mx-5 bg-dark-blue-gradient2 pb-10 sm:pb-20 pt-80 sm:pt-10 px-0 sm:px-20 rounded-2xl flex flex-col items-center"
            >
                <img class="-mt-36 w-full mb-8 hidden sm:block" src="~/assets/images/dresovi.png" alt="Dresovi" />
                <h1 class="mb-2 font-bold uppercase font-saira text-h2-display text-blue-50 text-center">
                    PERSONALIZIRAJ <br />SVOJ DRES
                </h1>
                <p class="font-normal text-white font-roboto text-body1 mb-7 text-center px-5 sm:px-0">
                    Tvoj dres, tvoja pravila. Personaliziraj svoj omiljeni dres i učini ga jedinstvenim.
                </p>
                <NuxtLink to="/c/2025-2026" class="uppercase btn-primary small">Naruči svoj dres</NuxtLink>
            </div>
        </div>

        <!-- NOVO U PONUDI -->
        <div class="container pb-6 mx-auto px-5 sm:px-5">
            <div class="flex flex-col md:flex-row justify-between gap-4">
                <div class="flex flex-col gap-2 md:flex-row md:gap-9">
                    <div class="flex flex-row justify-between items-center">
                        <h1 class="font-bold text-blue-900 uppercase font-saira text-h2-normal">NOVO U PONUDI</h1>
                        <a
                            href="/c/novo-u-ponudi/"
                            id="btn-mobile-view-all-new-products"
                            data-location="home-mobile-new-products"
                            class="uppercase btn-secondary xs h-fit md:hidden"
                        >
                            Pogledaj sve
                        </a>
                    </div>
                    <p class="font-normal text-blue-900 font-roboto text-body1">
                        Naš se asortiman stalno proširuje novim <br />
                        atraktivnim artiklima, ovo su samo neki od njih.
                    </p>
                </div>
                <a
                    href="/c/novo-u-ponudi/"
                    id="btn-desktop-view-all-new-products"
                    data-location="home-desktop-new-products"
                    class="uppercase btn-secondary xs h-fit hidden md:block self-center"
                >
                    Pogledaj sve
                </a>
            </div>
            <div v-if="newProducts.length > 0">
                <Carousel :products="newProducts" class="pt-6" />
            </div>
            <div v-else class="text-center text-blue-900 font-roboto pt-12">NEMA PROIZVODA U OVOJ KATEGORIJI</div>
        </div>
    </div>

    <div class="mx-5 my-20 md:container md:mx-auto px-2 sm:px-5 hidden">
        <div class="flex flex-wrap items-center justify-between">
            <h1 class="w-1/2 md:w-auto font-bold text-blue-900 uppercase font-saira text-h2-normal">
                kupi dresove igrača
            </h1>
            <a
                href="/c/dresovi/"
                id="btn-mobile-view-all-players"
                data-location="home-mobile-view-all-players"
                class="h-fit uppercase btn-secondary xs md:w-auto ms-auto"
            >
                Pogledaj sve
            </a>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-4 lg:grid-cols-4">
            <div
                class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[200px] sm:h-[400px]"
            >
                <span
                    class="absolute z-10 font-saira -rotate-90 top-4 sm:top-7 left-5 text-[#D9F1FD] font-bold text-2xl sm:text-5xl"
                >
                    29
                </span>
                <div
                    class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-4 sm:bottom-7 left-12 sm:left-[4.3rem]"
                >
                    <span class="font-saira text-[#D9F1FD] font-bold text-2xl sm:text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke: 1px white; color: transparent">andro</span> babić
                    </span>
                </div>

                [NAPOMENA] Default slika 
                <img
                    src="~/assets/images/player.png"
                    alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0"
                />

                [NAPOMENA] hover slika 
                <img
                    src="~/assets/images/player-bg.png"
                    alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]"
                />
            </div>
            <div
                class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[200px] sm:h-[400px]"
            >
                <span
                    class="absolute z-10 font-saira -rotate-90 top-4 sm:top-7 left-5 text-[#D9F1FD] font-bold text-2xl sm:text-5xl"
                >
                    29
                </span>
                <div
                    class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-4 sm:bottom-7 left-12 sm:left-[4.3rem]"
                >
                    <span class="font-saira text-[#D9F1FD] font-bold text-2xl sm:text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke: 1px white; color: transparent">andro</span> babić
                    </span>
                </div>

               
                <img
                    src="~/assets/images/player.png"
                    alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0"
                />

               
                <img
                    src="~/assets/images/player-bg.png"
                    alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]"
                />
            </div>
            <div
                class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[200px] sm:h-[400px]"
            >
                <span
                    class="absolute z-10 font-saira -rotate-90 top-4 sm:top-7 left-5 text-[#D9F1FD] font-bold text-2xl sm:text-5xl"
                >
                    29
                </span>
                <div
                    class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-4 sm:bottom-7 left-12 sm:left-[4.3rem]"
                >
                    <span class="font-saira text-[#D9F1FD] font-bold text-2xl sm:text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke: 1px white; color: transparent">andro</span> babić
                    </span>
                </div>

              
                <img
                    src="~/assets/images/player.png"
                    alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0"
                />

             
                <img
                    src="~/assets/images/player-bg.png"
                    alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]"
                />
            </div>
            <div
                class="group relative rounded-2xl overflow-hidden bg-[linear-gradient(13.73deg,_#012436_15.68%,_#006296_54.1%,_#0083C9_85.54%)] shadow-xl h-[200px] sm:h-[400px]"
            >
                <span
                    class="absolute z-10 font-saira -rotate-90 top-4 sm:top-7 left-5 text-[#D9F1FD] font-bold text-2xl sm:text-5xl"
                >
                    29
                </span>
                <div
                    class="absolute z-10 flex items-end h-auto origin-bottom-left -rotate-90 bottom-4 sm:bottom-7 left-12 sm:left-[4.3rem]"
                >
                    <span class="font-saira text-[#D9F1FD] font-bold text-2xl sm:text-5xl whitespace-nowrap uppercase">
                        <span style="-webkit-text-stroke: 1px white; color: transparent">andro</span> babić
                    </span>
                </div>

                
                <img
                    src="~/assets/images/player.png"
                    alt="player"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform right-[-0.75rem] group-hover:translate-x-2 group-hover:opacity-0"
                />

                
                <img
                    src="~/assets/images/player-bg.png"
                    alt="player-hover"
                    class="absolute bottom-0 z-10 object-cover h-full transition-all duration-500 transform translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 right-[-0.75rem]"
                />
            </div>
        </div>
 
        <div></div>
    </div>


</template>

<style scoped>
.bg-dresovi {
    background-image: url('/assets/images/bg-dresovi.png');
}
.bg-odjeca {
    background-image: url('/assets/images/bg-odjeca.png');
}
.bg-pokloni {
    background-image: url('/assets/images/bg-skolski-pribor.png');
}

.bg-home1 {
    background-image: url('/assets/images/backgrounds/bg-home1.png');
}

.bg-home2 {
    background-image: url('/assets/images/backgrounds/bg-home2.jpg');
    background-repeat: no-repeat;
    background-position: top;
}

.bg-players::after {
    position: absolute;
    content: url('/assets/images/players-home.png');
    right: 24%;
    top: 19%;
    z-index: 0;
}

@media (max-width: 2140px) {
    .bg-players::after {
        right: 0%;
    }
}

@media (max-width: 1650px) {
        .bg-players::after {
        content: url('/assets/images/players-home.png');
        top: 25%;
        right: 10%;
    }
}

@media (max-width: 1100px) {
    .bg-players::after {
        top: 27%;
    }
}

@media (max-width: 1024px) {
    .bg-players::after {
        display: none;
    }
    .bg-home1 {
        background-size: contain;
    }
}
</style>

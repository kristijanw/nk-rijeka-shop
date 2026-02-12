<script setup lang="ts">
import { activetab, openMenu } from '~/composables/activeTabNavigation'
import { closeTabMenu } from '~/composables/activeTabNavigation'

const activeTabContentRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const dropdownHeight = ref('0px')

watch([openMenu, activetab], () => {
    if (openMenu.value) {
        setTimeout(() => {
            if (!activeTabContentRef.value) return

            const el = activeTabContentRef.value
            const newHeight = el.scrollHeight + 70 + 'px'
            dropdownHeight.value = newHeight
        }, 30)
    } else {
        dropdownHeight.value = '0px'
    }
})

/*search dropdown*/
const router = useRouter()
const searchTerm = ref('')

const submitSearch = () => {
    if (searchTerm.value.trim()) {
        router.push({ path: '/search', query: { q: searchTerm.value.trim() } })
        openMenu.value = false
        activetab.value = ''
    }
}

const isInputActive = ref(false)
</script>

<template>
    <div
        ref="dropdownRef"
        :style="{ height: dropdownHeight }"
        class="dropdown-content overflow-hidden transition-all duration-300 ease-in-out will-change-[height]"
    >
        <!-- Dropdown sekcija za navigaciju -->
        <div class="w-full max-w-[592px] xl:max-w-[638px] mx-auto pt-7 pb-12 border-t border-customColors-200">
            <Transition name="reveal">
                <div
                    v-if="activetab === 'dresovi' && openMenu"
                    :key="activetab"
                    ref="activeTabContentRef"
                    class="flex gap-4"
                    id="dresovi"
                >
                    <ul class="flex flex-col gap-3">
                        <li class="heading-sub"><a href="/c/dresovi/2025-2026" @click="closeTabMenu">2025./2026.</a></li>
                        <li class="heading-sub"><a href="/c/dresovi/2024-2025" @click="closeTabMenu">2024./2025.</a></li>
                        <li class="heading-sub"><a href="/c/dresovi/starije-sezone" @click="closeTabMenu">Starije sezone</a></li>
                    </ul>
                </div>
            </Transition>

            <Transition name="reveal">
                <div
                    v-if="activetab === 'odjeca' && openMenu"
                    :key="activetab"
                    ref="activeTabContentRef"
                    class="flex justify-between gap-4"
                    id="odjeca"
                >
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">MUŠKARCI</h5>
                        <hr class="divider" />
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub">
                                <a href="/c/odjeca/hoodice?ageGender=muskarci" @click="closeTabMenu">Hoodice</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/odjeca/t-shirt-i-polo-majice?ageGender=muskarci" @click="closeTabMenu"
                                    >T-shirt i polo majice</a
                                >
                            </li>
                            <li class="heading-sub">
                                <a href="/c/odjeca/hlace-odjeca?ageGender=muskarci" @click="closeTabMenu">Hlače</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/odjeca/ostalo-odjeca?ageGender=muskarci" @click="closeTabMenu">Ostalo</a>
                            </li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">ŽENE</h5>
                        <hr class="divider" />
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub">
                                <a href="/c/odjeca/hoodice?ageGender=zene" @click="closeTabMenu">Hoodice</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/odjeca/t-shirt-i-polo-majice?ageGender=zene" @click="closeTabMenu"
                                    >T-shirt i polo majice</a
                                >
                            </li>
                            <li class="heading-sub">
                                <a href="/c/odjeca/ostalo-odjeca?ageGender=zene" @click="closeTabMenu">Ostalo</a>
                            </li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">DJECA</h5>
                        <hr class="divider" />
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub">
                                <a href="/c/odjeca/hoodice?ageGender=djeca" @click="closeTabMenu">Hoodice</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/odjeca/t-shirt-i-polo-majice?ageGender=djeca" @click="closeTabMenu"
                                    >T-shirt i polo majice</a
                                >
                            </li>
                            <li class="heading-sub">
                                <a href="/c/odjeca/ostalo-odjeca?ageGender=djeca" @click="closeTabMenu">Ostalo</a>
                            </li>
                        </ul>
                    </div>
                    <div class="basis-1/4">
                        <h5 class="pb-4 heading-subtitle">MODNI DODACI</h5>
                        <hr class="divider" />
                        <ul class="flex flex-col gap-3 pt-4">
                            <li class="heading-sub"><a href="/c/odjeca/kape" @click="closeTabMenu">Kape</a></li>
                            <li class="heading-sub"><a href="/c/odjeca/salovi" @click="closeTabMenu">Šalovi</a></li>
                            <li class="heading-sub"><a href="/c/odjeca/pojasevi" @click="closeTabMenu">Pojasevi</a></li>    
                        </ul>
                    </div>
                </div>
            </Transition>

            <Transition name="reveal">
                <div
                    v-if="activetab === 'joma' && openMenu"
                    :key="activetab"
                    ref="activeTabContentRef"
                    class="flex justify-between gap-4"
                    id="joma"
                >
                    <div class="basis-1/4">
                        <ul class="flex flex-col gap-3">
                            <li class="heading-sub">
                                <a href="/c/joma/hlace" @click="closeTabMenu">Hlače</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/joma/majice" @click="closeTabMenu">Majice</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/joma/trenerke" @click="closeTabMenu">Trenerke</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/joma/jakne" @click="closeTabMenu">Jakne</a>
                            </li>
                            <li class="heading-sub">
                                <a href="/c/joma/lopte" @click="closeTabMenu">Lopte</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </Transition> 


            <Transition name="reveal">
                <div
                    v-if="activetab === 'pokloni' && openMenu"
                    :key="activetab"
                    ref="activeTabContentRef"
                    class="flex gap-4"
                    id="pokloni"
                >
                    <ul class="flex flex-col gap-3">
                        <li class="heading-sub">
                            <a href="/c/pokloni/skolski-asortiman" @click="closeTabMenu">Školski asortiman</a>
                        </li>
                        <li class="heading-sub">
                            <a href="/c/pokloni/maske-za-mobitel" @click="closeTabMenu">Maske za mobitel</a>
                        </li>
                        <li class="heading-sub"><a href="/c/pokloni/dom" @click="closeTabMenu">Dom</a></li>
                        <li class="heading-sub">
                            <a href="/c/pokloni/privjesci" @click="closeTabMenu">Privjesci</a>
                        </li>
                        <li class="heading-sub">
                            <a href="/c/pokloni/zastave" @click="closeTabMenu">Zastave</a>
                        </li>
                        <li class="heading-sub">
                            <a href="/c/pokloni/cestitke" @click="closeTabMenu">Čestitke</a>
                        </li>
                        <li class="heading-sub">
                            <a href="/c/pokloni/ostalo" @click="closeTabMenu">Ostalo</a>
                        </li>
                    </ul>
                </div>
            </Transition>

            <Transition name="reveal">
                <div
                    v-if="activetab === 'akcije' && openMenu"
                    :key="activetab"
                    ref="activeTabContentRef"
                    class="flex gap-4"
                    id="akcije"
                >
                    <ul class="flex flex-col gap-3">
                        <li class="heading-sub">
                            <a href="/c/outlet?a=dresovi" @click="closeTabMenu">Dresovi</a>
                        </li>
                        <li class="heading-sub">
                            <a href="/c/outlet?a=joma" @click="closeTabMenu">JOMA</a>
                        </li>
                        <li class="heading-sub">
                            <a href="/c/outlet?a=ostalo" @click="closeTabMenu">Ostalo</a>
                        </li>
                    </ul>
                </div>
            </Transition>

            <!--SERACH DROPDOWN-->
            <Transition name="reveal">
                <div v-if="activetab === 'search' && openMenu" :key="activetab" ref="activeTabContentRef">
                    <form @submit.prevent="submitSearch">
                        <div class="relative max-w-[580px] mx-auto mt-2">
                            <Icon
                                name="akar-icons:search"
                                class="absolute left-3 top-1/2 -translate-y-1/2 text-white text-base pointer-events-none"
                            />
                            <input
                                v-model="searchTerm"
                                type="text"
                                placeholder="Pretraži"
                                class="w-full pl-10 pr-10 py-2 bg-transparent font-light border-[1.4px] border-blue-800 rounded-2xl text-sm text-customColors-400 placeholder-customColors-400 opacity-0 animate-fade-in focus:outline-none focus:ring-0"
                                @focus="isInputActive = true"
                                @blur="isInputActive = false"
                            />
                            <Icon
                                v-if="searchTerm"
                                name="akar-icons:cross"
                                class="absolute right-3 top-1/2 -translate-y-1/2 text-white text-base cursor-pointer"
                                @click.stop="searchTerm = ''"
                            />
                        </div>
                    </form>
                    <hr class="bg-blue-800 h-[1.4px] w-[300%] -ml-[100%] relative border-0 my-6" />
                    <div class="max-w-full mx-auto mt-2 text-sm text-customColors-400 text-center font-light">
                        Pritisni Enter za prikaz rezultata pretrage
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<style scoped>
.input-fade-enter-active {
    animation: fadeIn 0.3s ease-out forwards;
}

.input-fade-leave-active {
    animation: fadeOut 0.2s ease-in forwards;
}
</style>

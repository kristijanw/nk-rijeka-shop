<script setup lang="ts">
    import { ref, computed, toValue } from 'vue'
    import { useCartStore } from '~/composables/useCart';

    const cartStore = useCartStore();

    const activeTab = ref('') ;
    const subActive = ref(''); 
    const searchTerm = ref('');
    const isHamburgerOpen = ref(false);

    const toggleHamburger = () => {
        if(isHamburgerOpenAccount) isHamburgerOpenAccount.value = false;
        if(isHamburgerOpenSearch) isHamburgerOpenSearch.value = false;

        isHamburgerOpen.value = !isHamburgerOpen.value;
   
        if (!isHamburgerOpen.value) {
            activeTab.value = '';
            subActive.value = '';
        }
    };

    const setActive = (tab: string) => {
        activeTab.value = activeTab.value === tab ? '' : tab;
        subActive.value = ''; 
    }

    const setSubActive = (subTab: string) => {
        subActive.value = subActive.value === subTab ? '' : subTab;
    };

    const activeDropdownRef = ref<HTMLElement | null>(null);
    const dropdownHeight = ref('0px');

    watch([isHamburgerOpen, activeTab, subActive], () => {
        if (isHamburgerOpen.value) {
            setTimeout(() => {
                if (!activeDropdownRef.value) return;

                const el = activeDropdownRef.value;
                const newHeight = (el.scrollHeight + 70) + 'px';
                dropdownHeight.value = newHeight;
            }, 10);
        } else {
            dropdownHeight.value = '0px';
        }
    });


    const closeTabMenu = () => {
        isHamburgerOpen.value = false;
        activeTab.value = '';
        subActive.value = '';
    };


    // ACCOUNT
    const isHamburgerOpenAccount = ref(false);
    const activeDropdownRefAccount = ref<HTMLElement | null>(null);
    const dropdownHeightAccount = ref('0px');
    
    const toggleHamburgerAccount = () => {
        if(isHamburgerOpen) isHamburgerOpen.value = false;
        if(isHamburgerOpenSearch) isHamburgerOpenSearch.value = false;

        isHamburgerOpenAccount.value = !isHamburgerOpenAccount.value;
    };

    watch([isHamburgerOpenAccount, activeTab, subActive], () => {
        if (isHamburgerOpenAccount.value) {
            setTimeout(() => {
                if (!activeDropdownRefAccount.value) return;

                const el = activeDropdownRefAccount.value;
                const newHeight = (el.scrollHeight + 5) + 'px';
                dropdownHeightAccount.value = newHeight;
            }, 10);
        } else {
            dropdownHeightAccount.value = '0px';
        }
    });

    // SEARCH
    const isHamburgerOpenSearch = ref(false);
    const activeDropdownRefSearch = ref<HTMLElement | null>(null);
    const dropdownHeightSearch = ref('0px');
    
    const toggleHamburgerSearch = () => {
        if(isHamburgerOpen) isHamburgerOpen.value = false;
        if(isHamburgerOpenAccount) isHamburgerOpenAccount.value = false;

        isHamburgerOpenSearch.value = !isHamburgerOpenSearch.value;
    };

    watch([isHamburgerOpenSearch, activeTab, subActive], () => {
        if (isHamburgerOpenSearch.value) {
            setTimeout(() => {
                if (!activeDropdownRefSearch.value) return;

                const el = activeDropdownRefSearch.value;
                const newHeight = (el.scrollHeight + 15) + 'px';
                dropdownHeightSearch.value = newHeight;
            }, 10);
        } else {
            dropdownHeightSearch.value = '0px';
        }
    });

    const dropdownWrapper = ref<HTMLElement | null>(null);
    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });
    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside);
    });

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownWrapper.value && !dropdownWrapper.value.contains(event.target as Node)) {
            if(isHamburgerOpen) isHamburgerOpen.value = false;
            if(isHamburgerOpenAccount) isHamburgerOpenAccount.value = false;
            if(isHamburgerOpenSearch) isHamburgerOpenSearch.value = false;
        }
    };


    const router = useRouter()

    const submitSearch = () => {
    if (searchTerm.value.trim()) {
        router.push({ path: '/search', query: { q: searchTerm.value.trim() } })
        isHamburgerOpenSearch.value = false
        searchTerm.value = ''
    }
    }
</script>

<template>
    <div>
        <!-- MOBILE HEADER -->
        <header 
            ref="dropdownWrapper"
            class="block lg:hidden container transition-all duration-300 ease-in-out mx-auto w-auto max-w-[calc(100%-2rem)] bg-customColors-100 rounded-[40px] z-1 mt-6 fixed top-0 left-0 right-0 z-50"
            :class="isHamburgerOpen || isHamburgerOpenAccount || isHamburgerOpenSearch ? '!rounded-[24px]' : ''"
        >
            <nav>
                <div class="flex-between py-[18px] px-5 items-center rounded-[40px] transition-all duration-300 ease-in-out bg-header-gradient" :class="isHamburgerOpen || isHamburgerOpenAccount || isHamburgerOpenSearch ? '!rounded-[24px]' : ''">
                    <div class="flex flex-row items-center gap-6">
                        <!-- Ikona za otvaranje hamburger menu -->
                        <a href="#" @click.prevent="toggleHamburger" class="flex items-center gap-2 group">
                            <Icon 
                                :name="isHamburgerOpen ? 'radix-icons:cross-2' : 'radix-icons:hamburger-menu'" 
                                :class="[isHamburgerOpen ? 'text-white' : 'text-white', 'icon-link icon-xl']" 
                            />
                        </a>


                        <div @click="toggleHamburgerSearch" class="flex">
                            <Icon
                                :name="isHamburgerOpenSearch ? 'akar-icons:cross' : 'akar-icons:search'"
                                class="text-white link-bijeli size-4"
                            />
                        </div>

                    </div>

                    <a href="/" class="ml-3"><img class="h-auto w-28" src="/assets/images/logos/logo.svg" alt="Logo"></a>
                    
                    <div class="flex flex-row items-center gap-6">
                        <HeaderAccountDropdown class="hidden md:block" />
                        <HeaderAccountDropdownMobile class="block md:hidden" @toggleHamburgerAccount="toggleHamburgerAccount" />

                        <!--ikona košarice-->
                        <SidebarCartList />
                    </div>
                </div>

                <!-- Search dropdown -->
                <div
                    ref="dropdownRefSearch"
                    :style="{ height: dropdownHeightSearch }"
                    class="overflow-hidden transition-all duration-300 ease-in-out will-change-[height]"
                >
                    <div ref="activeDropdownRefSearch" class="border-t border-customColors-200">
                        <div class="relative w-full px-4 py-4">
                            <!-- Search ikona -->
                            <Icon
                                name="akar-icons:search"
                                class="absolute left-8 top-1/2 -translate-y-1/2 text-white text-base pointer-events-none"
                            />

                            <!-- Input -->
                            <input
                                v-model="searchTerm"
                                type="text"
                                placeholder="Pretraži"
                                class="w-full pl-12 pr-10 py-2 bg-transparent font-light border-[1.4px] border-blue-800 rounded-2xl text-base text-customColors-400 placeholder-customColors-400 focus:outline-none focus:ring-0"
                                @keyup.enter="submitSearch"
                            />

                            <!-- X za čišćenje -->
                            <Icon
                                v-if="searchTerm"
                                name="akar-icons:cross"
                                class="absolute right-8 top-1/2 -translate-y-1/2 text-white text-base cursor-pointer"
                                @click.stop="searchTerm = ''"
                            />
                        </div>
                        <hr class="bg-blue-800 h-[1.4px] w-full relative border-0" />
                        
                        <!-- Info poruka -->
                        <div class="max-w-full mx-auto mt-4 px-4 py-2 text-sm text-customColors-400 text-center font-light">
                            Pritisni Enter za prikaz rezultata pretrage
                        </div>
                    </div>
                </div>
                
                <!-- Account dropdown -->
                <div
                    ref="dropdownRefAccount"
                    :style="{ height: dropdownHeightAccount }"
                    class="overflow-hidden transition-all duration-300 ease-in-out will-change-[height]"
                >
                    <div ref="activeDropdownRefAccount" class="border-t border-customColors-200">
                        <div class="p-4">
                            <a href="/login" class="block w-full text-center uppercase btn-primary large">
                                Prijavi se
                            </a>

                            <div class="flex items-center justify-center gap-3 pt-4 mt-4 border-t border-blue-800"> 
                                <p class="text-sm font-normal text-white font-roboto">Nemaš račun?</p> 
                                <a href="/register" class="font-bold underline uppercase link-plavi">
                                    Registriraj se
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main dropdown -->
                <div 
                    ref="dropdownRef"
                    :style="{ height: dropdownHeight }"
                    class="overflow-hidden transition-all duration-300 ease-in-out will-change-[height]"
                >
                    <!-- Dropdown sekcija za navigaciju -->
                    <div class="px-6 pt-5 pb-5 border-t border-customColors-200">
                        <ul class="flex flex-col gap-4" ref="activeDropdownRef">
                            <!-- DRESOVI -->
                            <li>
                                <a href="#" @click.prevent="setActive('dresovi')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'dresovi' ? 'text-blue-500' : ''">DRESOVI</span>
                                    <Icon :name="activeTab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </a>
                            </li>
                            <template v-if="activeTab === 'dresovi'">
                                <li class="pl-5 font-normal heading-sub"><a href="/c/dresovi/2026-2027" @click="closeTabMenu">2026./2027.</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/dresovi/2025-2026" @click="closeTabMenu">2025./2026.</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/dresovi/2024-2025" @click="closeTabMenu">2024./2025.</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/dresovi/starije-sezone" @click="closeTabMenu">Starije sezone</a></li>
                            </template>

                            <!-- FORZA FIUME -->
                            <li class="font-normal heading-sub"><a href="/c/forza-fiume-premium">FORZA FIUME</a></li> 

                            <!-- ODJEĆA -->
                            <li>
                                <a href="#" @click.prevent="setActive('odjeca')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'odjeca' ? 'text-blue-500' : ''">ODJEĆA</span>
                                    <Icon :name="activeTab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </a>
                            </li>
                            <template v-if="activeTab === 'odjeca'">
                                <!-- Muškarci -->
                                <li>
                                    <a href="#" @click.prevent="setSubActive('muskarci')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'muskarci' ? 'text-blue-500' : ''">MUŠKARCI</span>
                                        <Icon :name="subActive === 'muskarci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </a>
                                </li>
                                <template v-if="subActive === 'muskarci'">
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/hoodice?ageGender=muskarci" @click="closeTabMenu">Hoodice</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/t-shirt-i-polo-majice?ageGender=muskarci" @click="closeTabMenu">T-shirt i polo majice</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/hlace-odjeca?ageGender=muskarci" @click="closeTabMenu">Hlače</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/ostalo-odjeca?ageGender=muskarci" @click="closeTabMenu">Ostalo</a></li>
                                </template>
                                <!-- Žene -->
                                <li>
                                    <a href="#" @click.prevent="setSubActive('zene')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'zene' ? 'text-blue-500' : ''">ŽENE</span>
                                        <Icon :name="subActive === 'zene' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </a>
                                </li>
                                <template v-if="subActive === 'zene'">
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/hoodice?ageGender=zene" @click="closeTabMenu">Hoodice</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/t-shirt-i-polo-majice?ageGender=zene" @click="closeTabMenu">T-shirt i polo majice</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/ostalo-odjeca?ageGender=zene" @click="closeTabMenu">Ostalo</a></li>
                                </template>
                                <!-- Djeca -->
                                <li>
                                    <a href="#" @click.prevent="setSubActive('djeca')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'djeca' ? 'text-blue-500' : ''">DJECA</span>
                                        <Icon :name="subActive === 'djeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </a>
                                </li>
                                <template v-if="subActive === 'djeca'">
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/hoodice?ageGender=djeca" @click="closeTabMenu">Hoodice</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/t-shirt-i-polo-majice?ageGender=djeca" @click="closeTabMenu">T-shirt i polo majice</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/ostalo-odjeca?ageGender=djeca" @click="closeTabMenu">Ostalo</a></li>
                                </template>
                                <!-- Modni dodaci -->
                                <li>
                                    <a href="#" @click.prevent="setSubActive('dodaci')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'dodaci' ? 'text-blue-500' : ''">MODNI DODACI</span>
                                        <Icon :name="subActive === 'dodaci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </a>
                                </li>
                                <template v-if="subActive === 'dodaci'">
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/kape" @click="closeTabMenu">Kape</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/salovi" @click="closeTabMenu">Šalovi</a></li>
                                    <li class="font-normal heading-sub pl-9"><a href="/c/odjeca/pojasevi" @click="closeTabMenu">Pojasevi</a></li>
                                </template>
                            </template>


                            <!-- JOMA -->
                            <li>
                                <a href="#" @click.prevent="setActive('joma')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'joma' ? 'text-blue-500' : ''">JOMA</span>
                                    <Icon :name="activeTab === 'joma' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </a>
                            </li>
                            <template v-if="activeTab === 'joma'">
                                    <li class="pl-5 font-normal heading-sub"><a href="/c/joma/hlace" @click="closeTabMenu">Hlače</a></li>
                                    <li class="pl-5 font-normal heading-sub"><a href="/c/joma/majice" @click="closeTabMenu">Majice</a></li>
                                    <li class="pl-5 font-normal heading-sub"><a href="/c/joma/trenerke" @click="closeTabMenu">Trenerke</a></li>
                                    <li class="pl-5 font-normal heading-sub"><a href="/c/joma/jakne" @click="closeTabMenu">Jakne</a></li>
                                    <li class="pl-5 font-normal heading-sub"><a href="/c/joma/lopte" @click="closeTabMenu">Lopte</a></li>
                            </template>

                            <!-- POKLONI -->
                            <li>
                                <a href="#" @click.prevent="setActive('pokloni')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'pokloni' ? 'text-blue-500' : ''">POKLONI</span>
                                    <Icon :name="activeTab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </a>
                            </li>
                            <template v-if="activeTab === 'pokloni'">
                                <li class="pl-5 font-normal heading-sub"><a href="/c/pokloni/skolski-asortiman" @click="closeTabMenu">Školski asortiman</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/pokloni/maske-za-mobitel" @click="closeTabMenu">Maske za mobitel</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/pokloni/dom" @click="closeTabMenu">Dom</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/pokloni/privjesci" @click="closeTabMenu">Privjesci</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/pokloni/zastave" @click="closeTabMenu">Zastave</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/pokloni/cestitke" @click="closeTabMenu">Čestitke</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/pokloni/ostalo" @click="closeTabMenu">Ostalo</a></li>
                            </template>


                            <!-- AKCIJE -->
                            <li>
                                <a href="#" @click.prevent="setActive('akcije')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'akcije' ? 'text-blue-500' : ''">OUTLET</span>
                                    <Icon :name="activeTab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </a>
                            </li>
                            <template v-if="activeTab === 'akcije'">
                                <li class="pl-5 font-normal heading-sub"><a href="/c/outlet?a=dresovi" @click="closeTabMenu">Dresovi</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/outlet?a=joma" @click="closeTabMenu">JOMA</a></li>
                                <li class="pl-5 font-normal heading-sub"><a href="/c/outlet?a=ostalo" @click="closeTabMenu">Ostalo</a></li>
                            </template>
                        </ul>
                        <a href="/favorites" @click="closeTabMenu" class="flex items-center justify-between px-6 pt-2 mt-2 -mx-6 border-t mobile-nav border-customColors-200">
                            <span class="">FAVORITI</span>
                            <Icon name="line-md:heart" />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>



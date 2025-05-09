<script setup lang="ts">
    import { ref, computed, toValue } from 'vue'
    import { useCartStore } from '~/composables/useCart';

    const cartStore = useCartStore();

    const activeTab = ref('') ;
    const subActive = ref(''); 
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
                const newHeight = (el.scrollHeight + 10) + 'px';
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
                        <NuxtLink to="#" @click.prevent="toggleHamburger" class="flex items-center gap-2 group">
                            <Icon 
                                :name="isHamburgerOpen ? 'radix-icons:cross-2' : 'radix-icons:hamburger-menu'" 
                                :class="[isHamburgerOpen ? 'text-white' : 'text-white', 'icon-link icon-xl']" 
                            />
                        </NuxtLink>


                        <div @click="toggleHamburgerSearch" class="flex">
                            <Icon name="akar-icons:search" class="text-white link-bijeli size-4" />
                        </div>
                    </div>

                    <NuxtLink to="/" class="ml-3"><img class="h-auto w-28" src="/assets/images/logos/logo.svg" alt="Logo"></NuxtLink>
                    
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
                        <div class="p-4">
                            <UInput 
                                icon="i-heroicons-magnifying-glass-20-solid" 
                                :trailing="true" 
                                placeholder="Pretraži proizvode..." 
                                class="overflow-hidden rounded-3xl"
                            />
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
                            <NuxtLink to="/login" class="block w-full text-center uppercase btn-primary large">
                                Prijavi se
                            </NuxtLink>

                            <div class="flex items-center justify-center gap-3 pt-4 mt-4 border-t border-blue-800"> 
                                <p class="text-sm font-normal text-white font-roboto">Nemaš račun?</p> 
                                <NuxtLink to="/register" class="font-bold underline uppercase link-plavi">
                                    Registriraj se
                                </NuxtLink>
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
                                <NuxtLink to="#" @click.prevent="setActive('dresovi')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'dresovi' ? 'text-blue-500' : ''">DRESOVI</span>
                                    <Icon :name="activeTab === 'dresovi' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'dresovi'">
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="/categories/dresovi/2024-2025">2024./2025.</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="/categories/dresovi/2023-2024">2023./2024.</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="/categories/dresovi">Starije sezone</NuxtLink></li>
                            </template>

                            <!-- ODJEĆA -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('odjeca')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'odjeca' ? 'text-blue-500' : ''">ODJEĆA</span>
                                    <Icon :name="activeTab === 'odjeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'odjeca'">
                                <!-- Muškarci -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('muskarci')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'muskarci' ? 'text-blue-500' : ''">MUŠKARCI</span>
                                        <Icon :name="subActive === 'muskarci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'muskarci'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hoodice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                                <!-- Žene -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('zene')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'zene' ? 'text-blue-500' : ''">ŽENE</span>
                                        <Icon :name="subActive === 'zene' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'zene'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hoodice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                                <!-- Djeca -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('djeca')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'djeca' ? 'text-blue-500' : ''">DJECA</span>
                                        <Icon :name="subActive === 'djeca' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'djeca'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hoodice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">T-shirt i polo majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                                <!-- Modni dodaci -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('dodaci')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'dodaci' ? 'text-blue-500' : ''">MODNI DODACI</span>
                                        <Icon :name="subActive === 'dodaci' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'dodaci'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Kape</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Šalovi</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Ostalo</NuxtLink></li>
                                </template>
                            </template>


                            <!-- KOLEKCIJE -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('kolekcije')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'kolekcije' ? 'text-blue-500' : ''">KOLEKCIJE</span>
                                    <Icon :name="activeTab === 'kolekcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'kolekcije'">
                                <!-- Joma -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('joma')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'joma' ? 'text-blue-500' : ''">JOMA</span>
                                        <Icon :name="subActive === 'joma' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'joma'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Hlače</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Majice</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Trenerke</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Jakne</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Lopte</NuxtLink></li>
                                </template>
                                <!-- hudice -->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('novehudice')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'novehudice' ? 'text-blue-500' : ''">HOODICE</span>
                                        <Icon :name="subActive === 'novehudice' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'novehudice'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Muškarci</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Žene</NuxtLink></li>
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Djeca</NuxtLink></li>
                                </template>
                                <!-- Forza fiume premium-->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('forza')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'forza' ? 'text-blue-500' : ''">FORZA FIUME PREMIUM</span>
                                        <Icon :name="subActive === 'forza' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'forza'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="/categories/ff">Pogledaj kolekciju</NuxtLink></li>
                                </template>

                                <!-- Zigman premium-->
                                <li>
                                    <NuxtLink to="#" @click.prevent="setSubActive('zigman')" class="flex items-center justify-between gap-2 pl-5 mobile-nav group">
                                        <span :class="subActive === 'zigman' ? 'text-blue-500' : ''">ZIGMAN & HNK RIJEKA</span>
                                        <Icon :name="subActive === 'zigman' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                    </NuxtLink>
                                </li>
                                <template v-if="subActive === 'zigman'">
                                    <li class="font-normal heading-sub pl-9"><NuxtLink to="#">Pogledaj kolekciju</NuxtLink></li>
                                </template>
                                

                            </template>

                            <!-- POKLONI -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('pokloni')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'pokloni' ? 'text-blue-500' : ''">POKLONI</span>
                                    <Icon :name="activeTab === 'pokloni' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'pokloni'">
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Školski asortiman</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Kućni asortiman</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Privjesci</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Zastave</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Čestitke</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="#">Ostalo</NuxtLink></li>
                            </template>


                            <!-- AKCIJE -->
                            <li>
                                <NuxtLink to="#" @click.prevent="setActive('akcije')" class="flex items-center justify-between gap-2 mobile-nav group">
                                    <span :class="activeTab === 'akcije' ? 'text-blue-500' : ''">OUTLET</span>
                                    <Icon :name="activeTab === 'akcije' ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
                                </NuxtLink>
                            </li>
                            <template v-if="activeTab === 'akcije'">
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="/categories/popusti-akcija/dresovi-popusti-akcija">Dresovi</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="/categories/popusti-akcija/joma-popusti-akcija">JOMA</NuxtLink></li>
                                <li class="pl-5 font-normal heading-sub"><NuxtLink to="/categories/popusti-akcija/dodaci-ostalo">Ostalo</NuxtLink></li>
                            </template>
                        </ul>
                        <NuxtLink to="/favorites" class="flex items-center justify-between px-6 pt-2 mt-2 -mx-6 border-t mobile-nav border-customColors-200">
                            <span class="">FAVORITI</span>
                            <Icon name="line-md:heart" />
                        </NuxtLink>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>



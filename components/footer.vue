<template>
    <div
        class="mx-auto bg-cover bg-top bg-[linear-gradient(180deg,rgba(0,25,38,0)_30%,rgba(0,25,38,0.4)_60%,rgba(0,25,38,1)_95%),url(/assets/images/backgrounds/Footer-bg-2.jpg)]"
    >
        <div class="pt-32 frame-p">
            <!--postani član -->
            <div
                class="iskaznice relative mx-auto max-w-[830px] p-6 sm:p-10 bg-[rgba(252,252,252,0.4)] rounded-2xl max-xl:max-w-[700px]"
            >
                <div
                    class="grid justify-end grid-cols-[190px_358px_150px] gap-4 max-xl:flex max-xl:flex-col max-xl:items-center"
                >
                    <div class="col-span-1">
                        <h4
                            class="mb-2 font-semibold text-right text-blue-600 uppercase font-saira text-h4-normal max-xl:pt-14"
                        >
                            Postani član
                        </h4>
                    </div>

                    <div class="col-span-1">
                        <p class="font-normal text-blue-900 font-roboto text-body2 max-xl:text-center md:ml-2 ml-0">
                            Učlani se u klub i ostvari popuste u našem WEB SHOPU i FAN SHOPU, na kupnju ulaznica te na
                            proizvode i usluge naših partnera.
                        </p>
                    </div>

                    <div class="col-span-1 text-right">
                        <a
                            href="/register/"
                            id="btn-register"
                            data-location="footer-become-member"
                            rel="noopener noreferrer"
                            class="inline-block uppercase btn-secondary large"
                            >Registriraj se</a
                        >
                    </div>
                </div>
            </div>

            <!--slogan -->
            <div
                class="flex flex-col items-center content-center justify-center pb-28 pt-28 max-2xl:pt-8 max-2xl:pb-8 max-xl:pt-8 max-xl:pb-8"
            >
                <img src="/assets/images/Slogan.png" class="pb-4 sm:pb-8" />
                <a
                    href="https://nk-rijeka.hr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-semibold font-saira text-h4-normal text-blue-50 link-bijeli"
                    >nk-rijeka.hr</a
                >
            </div>

            <!-- footer meni  -->
            <div
                class="mx-auto container grid grid-cols-1 text-center sm:text-left sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6"
            >
                <!-- Logo element -->
                <div
                    class="flex items-start justify-center pb-0 sm:col-span-full lg:col-span-full 2xl:col-span-1 sm:pb-5"
                >
                    <a href="https://nk-rijeka.hr/" target="blank">
                        <img
                            class="w-full max-w-[108px]"
                            src="~/assets/images/logos/hnk-rijeka-grb.svg"
                            alt="HNK Rijeka Grb"
                        />
                    </a>
                </div>

                <!-- Društvene mreže -->
                <div class="">
                    <h6 class="pt-3 footer-title md:pt-0">Društvene mreže</h6>
                    <p class="mb-4 footer-text mr-0 md:mr-8 lg:mr-10 custom-mr-between">Budi dio HNK Rijeka zajednice na društvenim mrežama</p>
                    <ul class="inline-flex gap-2">
                        <li>
                            <a class="circle-footer" href="https://www.facebook.com/nk.rijeka" target="_blank">
                                <Icon name="brandico:facebook" class="custom-blue" />
                            </a>
                        </li>
                        <li>
                            <a
                                class="circle-footer"
                                href="https://www.youtube.com/user/hnkrijekasluzbeni"
                                target="_blank"
                            >
                                <Icon name="mdi:youtube" class="custom-blue" />
                            </a>
                        </li>
                        <li>
                            <a class="circle-footer" href="https://www.tiktok.com/@hnkrijeka" target="_blank">
                                <Icon name="famicons:logo-tiktok" class="custom-blue" />
                            </a>
                        </li>
                        <li>
                            <a class="circle-footer" href="https://www.instagram.com/nk_rijeka" target="_blank">
                                <Icon name="hugeicons:instagram" class="custom-blue" />
                            </a>
                        </li>
                        <li>
                            <a class="circle-footer" href="https://x.com/nkrijeka?mx=2" target="_blank">
                                <Icon name="garden:twitter-stroke-12" class="custom-blue" />
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- O nama -->
                <div class="ml-10 max-lg:ml-0">
                    <h6 class="pt-3 footer-title sm:pt-0">O nama</h6>
                    <p class="mb-4 footer-text link-bijeli">
                        <NuxtLink to="/kontakt">Kontakt</NuxtLink>
                    </p>
                    <p class="footer-text link-bijeli">
                        <NuxtLink to="/kontakt">Fan Shop HNK Rijeka</NuxtLink>
                    </p>
                </div>

                <!-- Korisničke usluge -->
                <div>
                    <h6 class="pt-3 footer-title sm:pt-0">Korisničke usluge</h6>
                    <p class="mb-4 footer-text link-bijeli">
                        <NuxtLink to="/korisnicke-usluge">Dostava unutar RH</NuxtLink>
                    </p>
                    <p class="footer-text link-bijeli">
                        <NuxtLink to="/korisnicke-usluge">Međunarodna dostava</NuxtLink>
                    </p>
                </div>

                <!-- Uvjeti korištenja -->
                <div>
                    <h6 class="pt-3 footer-title sm:pt-0">Uvjeti korištenja</h6>
                    <p class="mb-4 footer-text link-bijeli">
                        <NuxtLink to="/nacini-placanja">Način plaćanja</NuxtLink>
                    </p>
                    <p class="mb-4 footer-text link-bijeli">
                        <NuxtLink to="/opci-uvjeti">Opći uvjeti kupnje</NuxtLink>
                    </p>
                    <p class="mb-4 footer-text link-bijeli">
                        <NuxtLink to="/zastita-podataka">Zaštita podataka</NuxtLink>
                    </p>
                    <p class="footer-text link-bijeli">
                        <NuxtLink to="/politika-kolacica">Politika o kolačićima</NuxtLink>
                    </p>
                </div>

                <!-- Newsletter -->
            </div>

            <!--cards-->
            <div class="mx-auto max-w-[825px] flex flex-wrap items-center justify-center gap-2 py-14">
                <img class="pr-3" src="~/assets/images/logos/mastercard-id.png" alt="Mastercard ID Check Logo" />
                <img class="pr-3" src="~/assets/images/logos/visa-secure.png" alt="Visa Secure Logo" />
                <img class="pr-3" src="~/assets/images/logos/american.png" alt="American Express Logo" />
                <img class="pr-3" src="~/assets/images/logos/diners.png" alt="Diners Club Logo" />
                <img class="pr-3" src="~/assets/images/logos/visa.png" alt="Visa Logo" />
                <img class="pr-3" src="~/assets/images/logos/mastercard.png" alt="MasterCard Logo" />
                <img class="pr-3" src="~/assets/images/logos/maestro.png" alt="Maestro Logo" />
                <img class="pr-3" src="~/assets/images/logos/discover.png" alt="Discover Network Logo" />
                <img class="pr-3" src="~/assets/images/logos/dina.png" alt="DinaCard Logo" />
                <img class="pr-3" src="~/assets/images/logos/keks.png" alt="KeksPay Logo" />
                <img class="pr-3" src="~/assets/images/logos/wspay.png" alt="WS Pay Logo" />
            </div>
        </div>

        <div
            class="flex flex-col-reverse items-center justify-between gap-5 p-6 mx-auto border-t border-blue-800 sm:flex-row sm:gap-0"
        >
            <div class="font-normal text-blue-400 text-roboto text-body4">
                Copyright © {{ new Date().getFullYear() }} HNK Rijeka
            </div>
            <div class="font-normal text-blue-400 text-roboto text-body4">
                Design and development by:
                <a
                    href="https://prospekt.hr"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-bold text-white hover:underline"
                    >Prospekt</a
                >
            </div>
        </div>
    </div>
</template>


<style>
@media (min-width: 640px) and (max-width: 767px) {
  .custom-mr-between {
    margin-right: 5rem; 
  }
}
</style>
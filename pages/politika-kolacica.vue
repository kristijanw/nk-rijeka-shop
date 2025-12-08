<script setup lang="ts">
import { InfoLinks } from '#components';

</script>

<template>
    <div class="max-w-[740px] mx-auto con-height pb-5 px-5">

        <h1 class="font-saira font-medium text-h1-normal text-gray-900 pb-5">
            POLITIKA KOLAČIĆA              
        </h1>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Naša politika o kolačićima objašnjava što su kolačići, kako mi koristimo kolačiće, kakav izbor imate u vezi 
            kolačića i kako možete pronaći dodatne informacije o kolačićima. Korištenjem ove web stranice pristajete na
            uporabu kolačića.
        </p>
        <br>
        <h2 class="font-saira font-semibold text-h5-normal text-gray-900 pt-3">
            ŠTO SU KOLAČIĆI?
        </h2>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Kolačić je informacija spremljena na Vaše računalo od strane web stranice koju posjetite. Kolačići obično spremaju 
            Vaše postavke, postavke za web stranicu, kao što su preferirani jezik ili adresa. Kasnije, kada opet otvorite istu 
            web stranicu, internetski preglednik šalje natrag kolačiće koji pripadaju toj stranici. Ovo omogućava stranici da 
            prikaže informacije prilagođene Vašim potrebama.
            <br><br>
            Kolačići mogu spremati širok raspon informacija uključujući osobne informacije (kao što je Vaše ime ili adresa e-pošte).
            Ipak, ova informacija može biti spremljena jedino ako Vi to omogućite – web stranice ne mogu dobiti pristup informacijama
            koji im niste dali i ne mogu pristupiti drugim datotekama na Vašem računalu. Zadane aktivnosti spremanja i slanja kolačića
            nisu Vam vidljive. Ipak, postavke internetskog preglednika možete promijeniti i tako sami izabrati hoćete li zahtjeve 
            za spremanje kolačića odobriti ili odbiti, te pobrisati spremljene kolačiće automatski pri zatvaranju 
            internetskog preglednika i slično.
        </p>
        <h2 class="font-saira font-semibold text-h5-normal text-gray-900 pt-8">
            KAKVE KOLAČIĆE KORISTIMO I ZAŠTO?
        </h2>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Privremeni kolačići ili kolačići sesije uklanjaju se s računala po zatvaranju internetskog preglednika. Pomoću njih
            web-mjesta pohranjuju privremene podatke, poput stavki u košarici za kupnju. Mi ih koristimo da omogućimo pristup sadržaju.
            Trajni ili spremljeni kolačići ostaju na računalu nakon zatvaranja internetskog preglednika. Pomoću njih web-mjesta 
            pohranjuju podatke, kao što su ime za prijavu i zaporka, tako da se ne morate prijavljivati prilikom svakog posjeta određenom
            mjestu. Trajni kolačići ostat će na računalu danima, mjesecima, čak i godinama. Mi koristimo trajne kolačiće kako bi bolje 
            razumjeli navike korisnika, tako da možemo poboljšati stranicu prema vašim navikama. Ova informacija je anonimna – 
            ne vidimo individualne podatke korisnika.
        </p>

        <h2 class="font-saira font-semibold text-h5-normal text-gray-900 pt-8">
            POPIS KOLAČIĆA
        </h2>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Kolačići od prve strane dolaze s web-mjesta koje gledate, a mogu biti stalni ili privremeni. Pomoću tih kolačića web-mjesta
            mogu pohraniti podatke koje će ponovo koristiti prilikom sljedećeg posjeta tom web-mjestu.
        </p>

        <table class="font-roboto font-normal text-body2 text-gray-900 w-full border-collapse">
            <thead>
                <tr class="border-b border-gray-300 text-left align-top">
                    <th class="pt-7 pb-4 w-[20%]">KOLAČIĆ</th>
                    <th class="pt-7 pb-4 w-[35%]">IME</th>
                    <th class="pt-7 pb-4 w-[45%]">SVRHA</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-gray-300 text-left align-top">
                    <td class="py-7">Google Analytics</td>
                    <td class="py-7 leading-[2.5]">
                        _dc_gtm_UA-#<br>
                        _ga<br>
                        _gid<br>
                        collect
                    </td>
                    <td class="py-7">
                        Ove kolačiće koristimo radi skupljanja informacija o tome kako posjetitelji koriste našu web stranicu. 
                        Ove informacije koristimo za izradu izvještaja i poboljšanje stranice. Kolačići prikupljaju informacije 
                        u anonimnom obliku, uključujući i broj posjetitelja web stranice, od kuda posjetitelji dolaze na web stranicu 
                        i pojedinačne stranice koje posjećuju. Ako ne dopustite ove kolačiće, mi vaš posjet nećemo uključiti u našu statistiku.
                    </td>
                </tr>
                <tr class="border-b border-gray-300 text-left align-top">
                    <td class="py-7">WordPress / Woocommerce</td>
                    <td class="py-7 leading-[2.5]">
                        wordpress_user_sw_secure_#<br>
                        wordpress_logged_in_#<br>
                        wordpress_sec_#<br>
                        woo_cart_expiration<br>
                        wp_woocommerce_session_#<br>
                        woocommerce_items_in_cart<br>
                        woocommerce_cart_hash
                    </td>
                    <td class="py-7">
                        Ovi kolačići koriste se za funkcionalnost web shopa, autentikaciju korisnika prilikom prijave, korištenje košarice, 
                        liste želja, i generalnog procesa kupnje. Kolačići su nužni za normalan rad web stranice.
                    </td>
                </tr>
                <tr class="border-b border-gray-300 text-left align-top">
                    <td class="py-7">Microsoft Clarity</td>
                    <td class="py-7 leading-[2.5]">
                       CLID <br>
                       ANONCHK <br>
                       MR <br>
                       MUID <br>
                       SM
                    </td>
                    <td class="py-7">
                        Koristi kolačiće i druge tehnologije za analitičko praćenje anonimnog ponašanja korisnika (npr. pomicanje stranice, klikovi i kretanje miša), što nam pomaže razumjeti kako 
                        posjetitelji koriste naše sadržaje i poboljšati funkcionalnost stranice. Prikupljeni podaci ne omogućuju identifikaciju pojedinačnih korisnika, 
                        a njihova obrada provodi se u skladu s Microsoftovom Politikom privatnosti i našom Politikom privatnosti.
                    </td>
                </tr>
            </tbody>
        </table>


        <h2 class="font-saira font-semibold text-h5-normal text-gray-900 pt-8">
            KAKAV IZBOR IMATE U VEZI KOLAČIĆA?
        </h2>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Isključivanjem kolačića odlučujete da nećete dopustiti pohranjivanje kolačića na vašem računalu. Postavke kolačića mogu se 
            kontrolirati i konfigurirati u vašem internet pregledniku. Za informacije o postavkama kolačića, odaberite Internet 
            preglednik koji koristite.
            <br><br>
            <a href="https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=hr" target="blank" class="link-plavi underline decoration-1 font-semibold">Chrome</a><br>
            <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US" target="blank" class="link-plavi underline decoration-1 font-semibold">Firefox</a><br>
            <a href="https://support.microsoft.com/hr-hr/windows/upravljanje-kola%C4%8Di%C4%87ima-u-pregledniku-microsoft-edge-prikaz-dopu%C5%A1tanje-blokiranje-brisanje-i-kori%C5%A1tenje-168dab11-0753-043d-7c16-ede5947fc64d" target="blank" class="link-plavi underline decoration-1 font-semibold">Internet Explorer</a><br>
            <a href="https://help.opera.com/en/latest/web-preferences/" target="blank" class="link-plavi underline decoration-1 font-semibold">Opera</a> (stranica na engleskom jeziku)<br>
            <a href="https://support.apple.com/hr-hr/guide/safari/sfri11471/mac" target="blank" class="link-plavi underline decoration-1 font-semibold">Safari</a>
            <br><br>
            Imajte na umu, blokiranjem kolačića i dalje možete pregledavati ovu web stranicu, no neke njezine mogućnosti Vam možda neće biti dostupne.
            Ako želite saznati više o kolačićima, uključujući i informacije o tome kako se kolačići postavljaju te kako možete upravljati njima ili ih
            isključiti, posjetite web stranicu <a href="https://allaboutcookies.org/" target="blank" class="link-plavi underline  decoration-1 font-semibold"> www.allaboutcookies.org </a> ili  <a href="https://youronlinechoices.eu/" target="blank" class="link-plavi underline  decoration-1 font-semibold"> www.youronlinechoices.eu</a>. 
            Ako želite onemogućiti praćenje putem servisa 
            Google Analytics na svim web smjestima, posjetite web stranicu http://tools.google.com/dlpage/gaoptout.
        </p>

        <h2 class="font-saira font-semibold text-h5-normal text-gray-900 pt-8">
            IZMJENA NAŠE POLITIKE KOLAČIĆA
        </h2>
        <p class="font-roboto font-normal text-body2 text-gray-900">
            Svaku buduću izmjenu naše politike o kolačićima objavit ćemo na ovoj stranici. Molimo Vas da povremeno 
            posjetite ovu stranicu radi informiranja o mogućim izmjenama naše politike o kolačićima. Ova politika o 
            kolačićima posljednji put je izmijenjena 3. listopada 2018. godine i zamjenjuje svaku drugu politiku o 
            kolačićima koja je važila prije tog datuma.
        </p>

        <InfoLinks />
    </div>
</template>



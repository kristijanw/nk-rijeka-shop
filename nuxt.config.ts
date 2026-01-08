import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'HNK Rijeka Web Shop — Official Fan Shop',
            meta: [
                {
                    name: 'description',
                    content:
                        'Kupite službene dresove, odjeću i navijački asortiman HNK Rijeke. Brza dostava i sigurna kupnja za sve navijače.',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
            script: [
                {
                    children: `(function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "s5ywisqnf3");`,
                    type: 'text/javascript',
                },
                // Google Tag Manager
                {
                    hid: 'gtm-script',
                    innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-PRVJ4LG9');`,
                },
            ],
            noscript: [
                {
                    innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PRVJ4LG9"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                    tagPosition: 'bodyOpen',
                },
            ],
        },
    },

    devtools: { enabled: false },

    vite: {
        server: {
            allowedHosts: ['web.nkrijeka-app.test'],
            strictPort: false,
            watch: {
                usePolling: true,
                interval: 1000,
            },
        },
    },

    devServer: {
        host: 'web.nkrijeka-app.test',
        port: 3000,
    },

    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL || 'https://backend.shop.nk-rijeka.hr',
            url: process.env.API_URL || 'https://backend.shop.nk-rijeka.hr/api/v1',
            siteUrl: 'https://shop.nk-rijeka.hr',
            token: process.env.TOKEN || 'qwertyuiopasdfghjklzxcvbnm123456',
            maintenanceMode: process.env.MAINTENANCE_MODE || 'false',
            maintenanceBypassToken:
                process.env.MAINTENANCE_BYPASS_TOKEN ||
                'N2glgJ0v8I3YjGQX0Op2aB7WQV1EnBhrMa4P546spbGp3tK5GSOtlmaGXj7IhON9',
        },
    },

    colorMode: {
        preference: 'light',
    },

    css: ['~/assets/icomoon/style.css'],

    modules: [
        '@nuxt/ui',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
        'nuxt-swiper',
        '@pinia/nuxt',
        'nuxt-auth-sanctum',
        // '@nuxt/devtools',
    ],

    sanctum: {
        baseUrl: process.env.BASE_URL || 'https://backend.shop.nk-rijeka.hr',
        redirect: {
            onAuthOnly: '/login',
            onLogin: '/profile',
        },
    },

    ssr: false,

    compatibilityDate: '2024-11-01',
})

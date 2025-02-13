// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
  app: {
    head: {
      title: 'NK Rijeka',
      meta: [
        { name: 'description', content: 'Test' }
      ],
    }
  },
  css: ['~/assets/icomoon/style.css'] 
})

// nuxt.config.ts
export default defineNuxtConfig({
  // Nuxt 4 é compatível com Vue 3 e TypeScript
  compatibilityDate: '2025-02-18', // Recomendado colocar a data atual
  future: {
    compatibilityVersion: 4,
  },
  // Configurações opcionais
  modules: [
    '@nuxt/ui', // Exemplo: instalando o Nuxt UI
    '@pinia/nuxt', // Exemplo: instalando o Pinia para gerenciamento de estado
  ],
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css'
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3333'
    }
  },
  build: {
    transpile: ['vuetify']
  },
  
  devtools: { enabled: true },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
import type { NuxtConfig } from '@nuxt/types'

export default defineNuxtConfig({
  // devtools: { enabled: true },
  buildModules: ['@nuxt/typescript-build'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  alias: {
    '@': resolve(__dirname, '/')
  },
  css: [
    '~/assets/main.css',
    'primevue/resources/themes/aura-light-green/theme.css'
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-vue3-google-signin',
    'nuxt-primevue'
  ],
  primevue: {
    /* Options */
    options: {
      ripple: true
    },
    components: {
      include: ['FileUpload', 'usetoast', 'Toast', 'useconfirm', 'confirmationservice']
    }
  },
  googleSignIn: {
    clientId:
      '673702241334-uv0tqtb21ntgcqsgua33ioge606pif77.apps.googleusercontent.com'
  },

  pinia: {
    autoImports: ['defineStore']
  },
  imports: {
    dirs: ['./stores', './types']
  },
  runtimeConfig: {
    public: {
      apibaseurl: process.env.NUXT_API_BASE_URL
    }
  }
  // ssr: false,
})

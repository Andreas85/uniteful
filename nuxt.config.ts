// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  // devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  css: ["~/assets/main.css"],
  modules: ["@pinia/nuxt", "nuxt-icon", "nuxt-vue3-google-signin"],
  googleSignIn: {
    clientId:
      "673702241334-uv0tqtb21ntgcqsgua33ioge606pif77.apps.googleusercontent.com",
  },

  pinia: {
    autoImports: ["defineStore"],
  },
  imports: {
    dirs: ["./stores", "./interfaces"],
  },
  runtimeConfig: {
    public: {
      apibaseurl: process.env.NUXT_API_BASE_URL,
    },
  },
  // ssr: false,
});

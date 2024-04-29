import Tooltip from 'primevue/tooltip'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use('tooltip', Tooltip)
})

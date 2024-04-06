export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const userStore = useUserStore()
  const token = useCookie(UNITED_COOKIE.TOKEN)
  const { logout } = userStore
  const { isAuthenticated } = storeToRefs(userStore)

  const api = $fetch.create({
    baseURL: config?.public?.apibaseurl,
    onRequest ({ request, options }) {
      if (token.value && isAuthenticated.value) {
        const headers = new Headers(options.headers)
        headers.set('Authorization', `Bearer ${token.value}`)
        options.headers = headers
      }
    },
    onResponseError ({ request, response, options }) {
      if (response.status === 401) {
        console.log('Unauthorised')
        logout()
      }
    }
  })
  return {
    provide: {
      api
    }
  }
})

export const useUserStore = defineStore('user', () => {
  // const userData = getUserDataInLocalStorage();
  const userData = useCookie(UNITED_COOKIE.USER_DATA) as unknown as IUser
  const user = ref<IUser>(userData)

  const token = useCookie(UNITED_COOKIE.TOKEN)

  const isAuthenticated = ref(!!token.value)
  // const isAuthenticated = ref(false);
  const setToken = (data?: string) => (token.value = data)
  const setUser = (data?: string) => (user.value = data)
  const setUserInCookies = (data: any) => (userData.value = data)

  const logout = () => {
    setToken()
    setUser()
  }

  // Watch for changes in token and update isAuthenticated accordingly
  watch(token, (newValue) => {
    isAuthenticated.value = !!newValue
  })

  return {
    isAuthenticated,
    token,
    user,
    logout,
    setToken,
    setUser,
    setUserInCookies
  }
})

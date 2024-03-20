export const useUserStore = defineStore("user", () => {
  // const userData = getUserDataInLocalStorage();
  const userData = useCookie(UNITED_COOKIE.USER_DATA, {
    maxAge: 60 * 60 * 24,
  });
  const user = ref(userData);

  const token = useCookie(UNITED_COOKIE.TOKEN, {
    maxAge: 60 * 60 * 24, // one day
  });

  const isAuthenticated = ref(!!token.value);
  // const isAuthenticated = ref(false);
  const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: string) => (user.value = data);
  const setUserInCookies = (data: any) => (userData.value = data);

  const logout = () => {
    setToken();
    setUser();
  };

  // Watch for changes in token and update isAuthenticated accordingly
  watch(token, (newValue) => {
    isAuthenticated.value = !!newValue;
  });

  return {
    isAuthenticated,
    token,
    user,
    logout,
    setToken,
    setUser,
    setUserInCookies,
  };
});

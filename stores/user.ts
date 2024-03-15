export const useUserStore = defineStore("user", () => {
  const user = ref();

  // const userData = getUserDataInLocalStorage();
  const userData = useCookie(UNITED_COOKIE.USER_DATA, {
    maxAge: 60 * 60,
  });

  const token = useCookie(UNITED_COOKIE.TOKEN, {
    maxAge: 60 * 60,
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

  // Watch for changes in token and update isAuthenticated accordingly
  watch(userData, (newValue) => {
    console.log(newValue, ">><L<L");
    // user.value = !!newValue;
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

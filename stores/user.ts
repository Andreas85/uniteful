export const useUserStore = defineStore("user", () => {
  const user = ref();
  const token = useCookie("MY_COOKIE", {
    maxAge: 60 * 60,
  });
  const isAuthenticated = ref(!!token.value);
  // const isAuthenticated = ref(false);
  const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: string) => (user.value = data);

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
  };
});

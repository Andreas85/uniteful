export const useUserStore = defineStore("user", () => {
  const user = ref();
  const token = useCookie("MY_COOKIE", {
    maxAge: 60 * 60,
  });
  const isAuthenticated = ref(!!token.value);
  // const isAuthenticated = ref(false);
  const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: string) => (user.value = data);

  const signin = async (data: any) => {
    try {
      const URL = "/auth/login";
      const response = await postRequest<IUser>(URL, data);
      setToken(response.token);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    if (token.value) {
      try {
        const URL = "https://dummyjson.com/user/1";
        const response = await getRequest<IUser>(URL);
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    setToken();
    setUser();
  };

  // Watch for changes in token and update isAuthenticated accordingly
  watch(token, (newValue) => {
    isAuthenticated.value = !!newValue;
  });

  return { isAuthenticated, token, user, signin, fetchUsers, logout };
});

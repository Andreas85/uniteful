export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  if (to.path === "/login" && userStore.isAuthenticated) {
    return navigateTo("/");
  }
});

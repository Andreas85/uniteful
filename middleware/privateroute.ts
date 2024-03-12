export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const PRIVATE_ROUTE = ["/events", "/groups"];

  if (PRIVATE_ROUTE.includes(to.path) && !userStore.isAuthenticated) {
    return navigateTo("/login");
  }
});

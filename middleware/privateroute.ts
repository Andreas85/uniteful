export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  const PRIVATE_ROUTES = ['/events', '/groups/owner', '/profile', '/profile/edit']

  // Function to check if the given path is a private route
  const isPrivateRoute = (path:string) => {
    return PRIVATE_ROUTES.some(route => path.startsWith(route))
  }

  if (isPrivateRoute(to.path) && !userStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

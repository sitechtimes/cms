export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()

  if (!to.path.startsWith('/auth') && !userStore.user)
    return navigateTo('/auth/signin')
})

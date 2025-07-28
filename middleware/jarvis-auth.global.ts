export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  console.log(userStore.user)

  if (!to.path.startsWith('/auth') && !userStore.user)
    return navigateTo('/auth/signin')
})

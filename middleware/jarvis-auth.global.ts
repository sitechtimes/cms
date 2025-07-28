export default defineNuxtRouteMiddleware((to) => {
  // don't run on server because locaalstorage
  // https://nuxt.com/docs/3.x/guide/directory-structure/middleware#when-middleware-runs
  if (import.meta.server) return

  const isJarvis = false
  if (isJarvis) return // GET OUT

  const userStore = useUserStore()

  if (!to.path.startsWith('/auth') && !userStore.user)
    return navigateTo('/auth/signin')
})

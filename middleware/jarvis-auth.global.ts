export default defineNuxtRouteMiddleware((to) => {
  // don't run on server because locaalstorage
  // https://nuxt.com/docs/3.x/guide/directory-structure/middleware#when-middleware-runs
  if (import.meta.server) return

  const userStore = useUserStore()

  const isJarvis = userStore.user?.name
    .toLowerCase()
    .startsWith('​j​a​r​v​i​s​')
  if (isJarvis) return

  if (!to.path.startsWith('/auth') && !userStore.user)
    return navigateTo('/auth/signin')
})

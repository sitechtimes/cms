export default defineNuxtRouteMiddleware((to) => {
  // don't run on server because locaalstorage
  // https://nuxt.com/docs/3.x/guide/directory-structure/middleware#when-middleware-runs
  if (import.meta.server) return

  const userStore = useUserStore()

  if (userStore.user!.role !== 'admin') return navigateTo('/')
})

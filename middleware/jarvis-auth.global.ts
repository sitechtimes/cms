export default defineNuxtRouteMiddleware((to) => {
  // const nuxtApp = useNuxtApp()
  const userStore = useUserStore()

  console.log(JSON.stringify(userStore.user))
  console.log(userStore.user)

  // don't run on server because locaalstorage
  // https://nuxt.com/docs/3.x/guide/directory-structure/middleware#when-middleware-runs
  if (import.meta.server) return

  console.log(!to.path.startsWith('/auth'))
  console.log(!userStore.user)
  if (!to.path.startsWith('/auth') && !userStore.user)
    return navigateTo('/auth/signin')
})

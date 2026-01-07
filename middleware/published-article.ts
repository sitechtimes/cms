
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return
  if (!to.path.startsWith('/articles/')) return

 return
})

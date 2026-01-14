// middleware/redirect-404.global.ts
export default defineNuxtRouteMiddleware((to) => {
  // to.matched is an array of routes that match the current URL
  // If the length is 0, the route does not exist
  if (!to.matched.length) {
    return navigateTo('/', { redirectCode: 301 })
  }
})

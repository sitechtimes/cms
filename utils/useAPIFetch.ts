import { useFetch } from '#app'

type useFetchType = typeof useFetch

// ! TODO: this is probably bad for nuxt server client stuff or something. look into it
/**
 * @function useAPIFetch
 * a wrapper for $fetch that calls the backend
 *
 * has credentials: 'include' by default, since we use cookie auth
 */
export const useAPIFetch: useFetchType = (path, options = {}) => {
  const config = useRuntimeConfig()
  options.baseURL = config.public.backend

  options.credentials = 'include'

  console.log(options)

  return useFetch(path, options)
}

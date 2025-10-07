import { useUserStore } from '#imports'

/** Makes a request to the given endpoint with the given method and body.
 * @param endpoint - the endpoint to request. It will be automatically appended to the base URL, **so it should NOT start with a `/`**.
 * @param method - the HTTP method to use for the request. Defaults to `"GET"`.
 * @param body - the body of the request as an object. It will be automatically converted to a JSON object.
 */
export async function requestEndpoint(
  endpoint: string,
  method?: string,
  body?: object
): Promise<void>
/** Makes a request to the given endpoint with the given method and body.
 * @template T - the type of the request's response
 * @param endpoint - the endpoint to request; **should NOT start with a `/`**.
 * @param method - the HTTP method to use for the request. Defaults to `"GET"`.
 * @param body - the body of the request as an object. It will be automatically converted to a JSON object.
 * @returns the JSON response from the request
 * @throws error object
 */
export async function requestEndpoint<T>(
  endpoint: string,
  method?: string,
  body?: object
): Promise<T>
export async function requestEndpoint<T>(
  endpoint: string,
  method?: string,
  body?: object
): Promise<T | void> {
  const config = useRuntimeConfig()
  const userStore = useUserStore()

  const headers: HeadersInit = {}

  if (userStore.user)
    headers['Authorization'] = `Bearer ${userStore.user.token}`

  const options: RequestInit = {}

  if (method) {
    options.method = method
    options.body = JSON.stringify(body)
    headers['Content-Type'] = 'application/json'
  }

  options.headers = headers

  const res = await fetch(config.public.backend + endpoint, options)

  const contentLength = res.headers.get('Content-Length')

  if (contentLength === '0') return undefined as T

  const text = await res.text()

  try {
    const jason = JSON.parse(text)

    if (jason.message === 'you are invalid') return userStore.signOut()

    if (!res.ok) {
      console.error(new Error(jason.message))
      throw jason.message
    }

    if (!res.ok) {
      console.error(new Error(jason.message))
      throw { ...jason, status: res.status }
    }

    return jason
  } catch (error) {
    console.error(error)
  }
}

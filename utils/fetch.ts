export async function requestEndpoint<T>(
  endpoint: string,
  method?: 'GET' | 'POST',
  body?: object
): Promise<T> {
  const config = useRuntimeConfig()

  const options: RequestInit = { method: 'GET' }
  if (method) options.method = method
  if (body) {
    options.body = JSON.stringify(body)
    options.headers = { 'Content-Type': 'application/json' }
  }

  const res = await fetch(config.public.backend + endpoint, options)
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`)

  const contentLength = res.headers.get('Content-Length')
  if (contentLength === '0') return undefined as T

  return res.json()
}

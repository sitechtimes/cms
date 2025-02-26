import type { User } from '~/types/user'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const user = ref<User | undefined>(JSON.parse(localStorage.user))

  async function signIn(email: string, password: string) {
    try {
      const res = await $fetch(BACKEND_URL + 'auth/signin', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data.errors))
      user.value = data
      localStorage.setItem('user', JSON.stringify(user.value))

      console.log(data)
      router.push(data.verified ? '/dashboard' : '/auth/verify')
    } catch (error) {
      console.error(error)
      user.value = undefined
      localStorage.removeItem('user')
    }
  }

  async function verify(token: string) {
    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + 'auth/verify/' + token,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data.errors))

      if (data.verified) {
        user.value = data
        return true
      } else {
        throw new Error('Verification failed')
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return { signIn, verify }
})

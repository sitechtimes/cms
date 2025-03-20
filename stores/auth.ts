import { defineStore } from 'pinia'
import type { User } from '~/types/user'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const user = ref<User>()

  async function signIn(email: string, password: string) {
    const data = await requestEndpoint<User>('auth/signin', 'POST', {
      email,
      password,
    })

    return (user.value = data)
  }

  async function signUp(name: string, email: string, password: string) {
    const data = await requestEndpoint<User>('auth/signup', 'POST', {
      name,
      email,
      password,
    })

    return (user.value = data)
  }

  async function requestVerification(newToken: boolean) {
    try {
      const data = await requestEndpoint<{ message: string; time: number }>(
        'auth/verify',
        'POST',
        {
          newToken,
        }
      )

      return data
    } catch (e) {
      const error = e

      // unauthorized. get out
      if (error.status === 401) {
        logout()
        return router.push('/auth/signin')
      }
    }
  }

  /**
   * signs the user out
   */
  function logout() {
    user.value = undefined
  }

  return { user, signIn, signUp, requestVerification, logout }
})

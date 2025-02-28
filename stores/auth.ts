import { defineStore } from 'pinia'
import type { User } from '~/types/user'

//

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>()

  async function signIn(
    email: string,
    password: string
  ): Promise<User | undefined> {
    try {
      const data = await useAPIFetch('/auth/signin', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })

      return data.data.value as unknown as User

      /*       const data = await res.json()
      if (!res.ok) throw new Error(JSON.stringify(data.errors))
      user.value = data
      localStorage.setItem('user', JSON.stringify(user.value))

      console.log(data)
      router.push(data.verified ? '/dashboard' : '/auth/verify') */
    } catch (error) {
      console.error(error)
      user.value = undefined
      // localStorage.removeItem('user')
    }
  }

  async function verify(token: string) {
    return 'not particularly'

    try {
      const res = await useFetch('/auth/verify/' + token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

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

  return { user, signIn, verify }
})

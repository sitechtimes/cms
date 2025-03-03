import { defineStore } from 'pinia'
import type { User } from '~/types/user'

//

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>()

  async function verify(token: string) {
    return 'not particularly'

    /*     try {
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
    } */
  }

  return { user, verify }
})

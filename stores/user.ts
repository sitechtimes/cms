import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    const user = ref<User>()

    async function signIn(email: string, password: string) {
      signOut()

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
      } catch (error) {
        // unauthorized. get out
        if (error.status === 401) {
          signOut()
          return router.push('/auth/signin')
        }
      }
    }

    /**
     * signs the user out
     */
    function signOut() {
      user.value = undefined

      const router = useRouter()
      router.push('/auth/signin')
    }

    return { user, signIn, signUp, requestVerification, signOut }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['user'],
    },
  }
)

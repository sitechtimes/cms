import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const user = ref<User>()

    async function signIn(email: string, password: string) {
      signOut()

      const data = await requestEndpoint<User>('/auth/signin', 'POST', {
        email,
        password,
      })

      return (user.value = data)
    }

    async function signUp(name: string, email: string, password: string) {
      await requestEndpoint('/auth/signup', 'POST', {
        name,
        email,
        password,
      })
    }

    async function requestVerification(newToken: boolean): Promise<{
      message: string
      time: number
      verified?: boolean
    }> {
      try {
        const data = await requestEndpoint<{ message: string; time: number }>(
          '/auth/verify',
          'POST',
          {
            newToken,
          }
        )

        return data
      } catch (error) {
        // unauthorized. get out
        if (error.status === 401) signOut()
        throw error
      }
    }

    async function verifyToken(token: string) {
      user.value = await requestEndpoint<User>(`/auth/verify?token=${token}`)
      // Wait for next tick to ensure state is properly set and persisted
      await nextTick()
      // Use navigateTo instead of router.push for better Nuxt integration
      await navigateTo('/', { replace: true })
    }

    async function signOut() {
      user.value = undefined
      // Wait for next tick to ensure state is properly cleared and persisted
      await nextTick()
      await navigateTo('/auth/signin', { replace: true })
    }

    return { user, signIn, signUp, requestVerification, signOut, verifyToken }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['user'],
    },
  }
)

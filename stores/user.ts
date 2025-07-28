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

    function signOut() {
      user.value = undefined
    }

    return { user, signIn }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['user'],
    },
  }
)

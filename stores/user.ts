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
      localStorage.setItem('user', JSON.stringify(data))

      return (user.value = data)
    }

    function signOut() {
      localStorage.removeItem('user')

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

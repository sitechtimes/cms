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

      const router = useRouter()
      router.push('/auth/signin')
    }

    return { user, signIn, signOut }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['user'],
    },
  }
)

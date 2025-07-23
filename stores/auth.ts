export const useUserStore = defineStore('user', () => {
  const user = ref<User>()
  const router = useRouter()

  async function signIn(email: string, password: string) {
    const data = await requestEndpoint<User>('auth/signin', 'POST', {
      email,
      password,
    })
    localStorage.setItem('user', JSON.stringify(data))

    router.push("/")
    return (user.value = data)
  }

  function logOut() {
    user.value = undefined
  }

  return { user, signIn, logOut }
})

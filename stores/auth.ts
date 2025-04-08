export const useUserStore = defineStore('user', () => {
  const user = ref<User>()

  async function signIn(email: string, password: string) {
    const data = await requestEndpoint<User>('auth/signin', 'POST', {
      email,
      password,
    })
    localStorage.setItem('user', JSON.stringify(data))

    return (user.value = data)
  }

  return { user, signIn }
})

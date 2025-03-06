import { defineStore } from 'pinia'
import type { User } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()

  async function signIn(email: string, password: string) {
    const data = await requestEndpoint<User>('auth/signin', 'POST', {
      email,
      password,
    })

    const cmsTest = await requestEndpoint('cms/')
    console.log(cmsTest)

    return (user.value = data)
  }

  return { user, signIn }
})

export async function signIn(email: string, password: string) {
  requestEndpoint('auth/signin', 'POST', {
    email,
    password,
  })
}

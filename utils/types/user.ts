export type User = {
  role: 'writer' | 'editor' | 'admin'
  verified: boolean
  name: string
  email: string
  id: string
  token: string
  imageUrl: string
}

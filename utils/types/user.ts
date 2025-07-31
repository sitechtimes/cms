export type User = {
  role: 'writer' | 'editor' | 'admin'
  verified: boolean
  name: string
  email: string
  id: string
  token: string
  imageUrl: string
}

export type Article = {
  _id: string
  category: string
  content: string
  createdAt: string
  customAuthor: string
  imageAlt: string | null
  imageUrl: string | null
  status: string
  title: string
  updatedAt: string
  userId: string
}

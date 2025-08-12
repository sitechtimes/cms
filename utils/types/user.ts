import type { Delta } from 'quill'

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
  deltaContent?: Delta
  createdAt: string
  customAuthor: string
  imageAlt: string | null
  imageUrl: string | null
  status: string
  title: string
  updatedAt: string
  userId: string
}

export type Status = 'draft' | 'review' | 'ready'

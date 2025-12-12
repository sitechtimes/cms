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
  status?: string
  title: string
  updatedAt: string
  userId?: string
  editorResponses: Array<{"name": string, "text": string}>
}

export type PublishedArticle = {
  _id: string
  title: string
  content: string
  customAuthor: string
  user: {
    id: string
    name: string
    imageUrl: string
  }
  imageUrl: string
  imageAlt: string
  category: string
  slug_history: string[]
  slug: string
  createdAt: string
  updatedAt: string
}

export type Status = 'draft' | 'review' | 'ready'

export type ArticleResponse = {
  articles: PublishedArticle[]
  isMore: boolean
}

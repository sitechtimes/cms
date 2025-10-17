import { defineStore } from 'pinia'

export const useArticleStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const reviewArticles = ref<Article[]>([])
  const readyArticles = ref<Article[]>([])
  const publishedArticle = ref<Response>()

  const userStore = useUserStore()

  async function fetchArticles() {
    try {
      const articlesData = await requestEndpoint<Article[]>(`/cms`)

      articles.value = articlesData

      if (userStore.user === undefined) {
        throw new Error('you are invalid part 2')
      }

      if (['editor', 'admin'].includes(userStore.user.role)) {
        const reviewData = await requestEndpoint<Article[]>('/cms/review')
        reviewArticles.value = reviewData
      }

      if (userStore.user.role === 'admin') {
        const readyData = await requestEndpoint<Article[]>('/cms/ready')
        readyArticles.value = readyData
        const publishedData = await requestEndpoint<Response>('/articles')
        publishedArticle.value = publishedData
      }
    } catch (e) {
      console.error(e)
    }
  }

  function sortArticles(status: Status) {
    return articles.value.filter((article) => article.status === status)
  }

  return {
    fetchArticles,
    sortArticles,
    articles,
    readyArticles,
    reviewArticles,
    publishedArticle,
  }
})

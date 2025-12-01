// stores/articleStore.ts
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

export const useArticleStore = defineStore('articles', () => {
  /** -----------------------------
   *  SHARED STATE
   * ------------------------------*/
  const articles = ref<Article[]>([])
  const reviewArticles = ref<Article[]>([])
  const readyArticles = ref<Article[]>([])
  const publishedArticle = ref<ArticleResponse>()

  const article = ref<Article>() // The article being edited

  const topics = [
    'feature',
    'news',
    'school',
    'entertainment',
    'lifestyle',
    'opinion',
    'science',
    'technology',
  ] as const

  const userStore = useUserStore()
  const route = useRoute()
  const router = useRouter()

  /** -----------------------------
   *  CONFIRMATION MESSAGE + PROGRESS
   * ------------------------------*/
  const progress = ref(0)
  const confirmationMessage = ref('')

  function startMessage(message: string) {
    confirmationMessage.value = message
    progress.value = 0

    const duration = 3000
    const startTime = performance.now()

    function update(now: number) {
      const elapsed = now - startTime
      progress.value = Math.min(elapsed / duration, 1)

      if (elapsed < duration) {
        requestAnimationFrame(update)
      } else {
        confirmationMessage.value = ''
      }
    }

    requestAnimationFrame(update)
  }

  /** -----------------------------
   *  EDITOR ACTIONS
   * ------------------------------*/

  async function loadArticle() {
    article.value = await requestEndpoint<Article>(
      `/cms/${route.params.id}`,
      'GET'
    )
  }

  async function saveArticle() {
    await requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    startMessage('Article saved!')
  }

  async function sendToReview() {
    if (article.value) {
      article.value.status = 'review'
      await requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent for review!')
  }

  async function readyArticle() {
    if (article.value) {
      article.value.status = 'ready'
      await requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article marked as ready!')
  }

  async function publishArticle() {
    await requestEndpoint(`/cms/${route.params.id}/publish`, 'POST')
    startMessage('Article published!')
  }

  async function deleteArticle() {
    await requestEndpoint(`/cms/${route.params.id}`, 'DELETE')
    router.push('/')
  }

  /** -----------------------------
   *  FETCHING + LISTING ARTICLES
   * ------------------------------*/

  async function fetchArticles() {
    try {
      const articlesData = await requestEndpoint<Article[]>(`/cms`)
      articles.value = articlesData

      if (!userStore.user) {
        throw new Error('Invalid user session')
      }

      if (['editor', 'admin'].includes(userStore.user.role)) {
        reviewArticles.value = await requestEndpoint<Article[]>('/cms/review')
      }

      if (userStore.user.role === 'admin') {
        readyArticles.value = await requestEndpoint<Article[]>('/cms/ready')
        publishedArticle.value =
          await requestEndpoint<ArticleResponse>('/articles')
      }
    } catch (e) {
      console.error(e)
    }
  }

  function sortArticles(status: Status) {
    return articles.value.filter((a) => a.status === status)
  }

  /** -----------------------------
   *  RETURN STORE
   * ------------------------------*/
  return {
    // article lists
    fetchArticles,
    sortArticles,
    articles,
    reviewArticles,
    readyArticles,
    publishedArticle,

    // editor state
    article,
    topics,
    progress,
    confirmationMessage,

    // editor actions
    loadArticle,
    saveArticle,
    sendToReview,
    readyArticle,
    publishArticle,
    deleteArticle,
    startMessage,
  }
})

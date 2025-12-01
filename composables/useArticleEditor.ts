export function useArticleEditor() {
  const route = useRoute()
  const router = useRouter()

  const progress = ref(0)
  const confirmationMessage = ref('')

  const userStore = useUserStore()
  const modalStore = useModalStore()
  const article = ref<Article>()
  const { user } = storeToRefs(userStore)

  async function saveArticle() {
    requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    startMessage('Article saved!')
  }

  async function sendToReview() {
    if (article.value) {
      article.value.status = 'review'
      requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent for review!')
  }

  async function readyArticle() {
    if (article.value) {
      article.value.status = 'ready'
      requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent to ready!')
  }

  async function publishArticle() {
    modalStore.closeDropdown()
    requestEndpoint(`/cms/${route.params.id}/publish`, 'POST')
    startMessage('Article published!')
  }

  async function deleteArticle() {
    requestEndpoint(`/cms/${route.params.id}`, 'DELETE')
    router.push('/')
  }

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

  return {
    route,
    user,
    article,
    confirmationMessage,
    progress,
    topics,
    saveArticle,
    sendToReview,
    readyArticle,
    publishArticle,
    deleteArticle,
  }
}

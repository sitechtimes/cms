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
    modalStore.closeDropdown()
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

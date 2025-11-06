export function useArticleEditor() {
  const route = useRoute()
  const router = useRouter()

  const dropdown = useTemplateRef('dropdown')
  const modal1 = useTemplateRef('modal1')
  const modal2 = useTemplateRef('modal2')
  const modal3 = useTemplateRef('modal3')
  const modal4 = useTemplateRef('modal4')

  const progress = ref(0)
  const confirmationMessage = ref('')

  const userStore = useUserStore()
  const article = ref<Article>()
  const { user } = storeToRefs(userStore)

  onBeforeMount(async () => {
    article.value = await requestEndpoint<Article>(
      `/cms/${route.params.id}`,
      'GET'
    )
  })

  function closeDropdown() {
    dropdown.value?.removeAttribute('open')
  }

  async function saveArticle() {
    closeDropdown()
    requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    startMessage('Article saved!')
  }

  function confirmSend() {
    closeDropdown()
    modal2.value?.showModal()
  }

  async function sendToReview() {
    if (article.value) {
      article.value.status = 'review'
      requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent for review!')
  }

  function confirmReady() {
    closeDropdown()
    modal4.value?.showModal()
  }

  async function readyArticle() {
    if (article.value) {
      article.value.status = 'ready'
      requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent to ready!')
  }

  function confirmPublish() {
    closeDropdown()
    modal3.value?.showModal()
  }

  async function publishArticle() {
    closeDropdown()
    requestEndpoint(`/cms/${route.params.id}/publish`, 'POST')
    startMessage('Article published!')
  }

  function confirmArticleDeletion() {
    closeDropdown()
    modal1.value?.showModal()
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
    dropdown,
    modal1,
    modal2,
    modal3,
    modal4,
    confirmationMessage,
    progress,
    topics,
    closeDropdown,
    saveArticle,
    confirmSend,
    sendToReview,
    confirmReady,
    readyArticle,
    confirmPublish,
    publishArticle,
    confirmArticleDeletion,
    deleteArticle,
  }
}

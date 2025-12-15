export const useModalStore = defineStore('modals', () => {
  const route = useRoute()
  const router = useRouter()

  const dropdown = ref<HTMLDetailsElement | null>(null)
  const modal1 = ref<HTMLDialogElement | null>(null)
  const modal2 = ref<HTMLDialogElement | null>(null)
  const modal3 = ref<HTMLDialogElement | null>(null)
  const modal4 = ref<HTMLDialogElement | null>(null)
  const modal5 = ref<HTMLDialogElement | null>(null)

  const progress = ref(0)
  const confirmationMessage = ref('')

  const article = ref<Article>()

  function setArticle(a: Article) {
    article.value = a
  }

  function closeDropdown() {
    dropdown.value?.removeAttribute('open')
  }

  async function saveArticle() {
    closeDropdown()
    requestEndpoint(`/cms/${route.params.id}/`, 'PUT', article.value)
    startMessage('Article saved!')
  }

  function confirmSendToDraft() {
    closeDropdown()
    modal5.value?.showModal()
  }

  function confirmSendToReview() {
    closeDropdown()
    modal2.value?.showModal()
  }

  async function readyArticle() {
    if (article.value) {
      article.value.status = 'ready'
      requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent to ready!')
  }

  function confirmReady() {
    closeDropdown()
    modal4.value?.showModal()
  }

  async function publishArticle() {
    closeDropdown()
    requestEndpoint(`/cms/${route.params.id}/publish`, 'POST')
    startMessage('Article published!')
  }

  function confirmPublish() {
    closeDropdown()
    modal3.value?.showModal()
  }

  function sendToDraft() {
    if (article.value) {
      article.value.status = 'draft'
      requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent to draft!')
  }

  function sendToReview() {
    if (article.value) {
      article.value.status = 'review'
      requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    }
    startMessage('Article sent for review!')
  }

  function confirmArticleDeletion() {
    closeDropdown()
    modal1.value?.showModal()
  }

  function deleteArticle() {
    requestEndpoint(`/cms/${route.params.id}`, 'DELETE')
    router.push('/')
  }

  function startMessage(message: string) {
    confirmationMessage.value = message
    progress.value = 0

    const duration = 3000
    const startTime = performance.now()

    function update(now: DOMHighResTimeStamp) {
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

  return {
    setArticle,
    saveArticle,
    readyArticle,
    deleteArticle,
    sendToDraft,
    sendToReview,
    publishArticle,
    confirmSendToDraft,
    confirmSendToReview,
    confirmArticleDeletion,
    confirmPublish,
    confirmReady,
    closeDropdown,
    modal1,
    modal2,
    modal3,
    modal4,
    modal5,
    dropdown,
    confirmationMessage,
    progress,
  }
})

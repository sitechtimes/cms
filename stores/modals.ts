export const useModalStore = defineStore('modals', () => {
  const route = useRoute()
  const router = useRouter()

  const dropdown = useTemplateRef<HTMLDialogElement>('dropdown')
  const modal1 = useTemplateRef<HTMLDialogElement>('modal1')
  const modal2 = useTemplateRef<HTMLDialogElement>('modal2')
  const modal3 = useTemplateRef<HTMLDialogElement>('modal3')
  const modal4 = useTemplateRef<HTMLDialogElement>('modal4')

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
    requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
    console.log(article.value)
    startMessage('Article saved!')
  }

  function confirmSend() {
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
    sendToReview,
    publishArticle,
    confirmSend,
    confirmArticleDeletion,
    confirmPublish,
    confirmReady,
    closeDropdown,
    modal1,
    modal2,
    modal3,
    modal4,
    dropdown,
    confirmationMessage,
    progress,
  }
})

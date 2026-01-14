export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return
  }

  const articleStore = useArticleStore()
  const userStore = useUserStore()

  if (articleStore.articles.length === 0) {
    await articleStore.fetchArticles()
  }

  const articleData = computed(() => articleStore.articles.concat(articleStore.reviewArticles, articleStore.readyArticles))

  const article = articleData.value.find(
    a => a._id === to.params.id
  )

  if (!article) {
    return navigateTo('/')
  }

  const isAuthor = userStore.user?.id === article.userId

  let targetPath: string | null = null

  if (article.status === 'draft') {
    targetPath = isAuthor
      ? `/articles/edit/${article._id}`
      : `/`
  } else if (article.status === 'review') {
    targetPath = isAuthor
      ? `/articles/edit/${article._id}`
      : `/articles/review/${article._id}`

  } else {
    targetPath = `/articles/${article._id}`
  }

  if (targetPath === to.path) {
    return
  }

  return navigateTo(targetPath)
})

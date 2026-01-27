export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const articleStore = useArticleStore()

  if (articleStore.publishedArticle?.articles.length === 0) await articleStore.fetchArticles()

  const articleData = computed(() => articleStore.publishedArticle?.articles || [])

  const article = articleData.value.find(
    a => a._id === to.params.id
  )

  if (!article) return navigateTo('/')
})

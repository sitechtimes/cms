
export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return
  // if (!to.path.startsWith('/articles/')) return

  // const articleStore = useArticleStore()

  // if (articleStore.articles.length === 0) 
  //   articleStore.fetchArticles()
  
  // const article = articleStore.articles.find(a => a._id === to.params.id)
  // console.log(article)

  // let status = ['edit', 'review'] as const
  // let index = 0
  // if (article?.status === 'draft') index = 0
  // else if (article?.status === 'review') index = 1

  // console.log("Determined statusPath:", status[index])
  // console.log("Current to.path:", to.path, `/articles/${status[index] || 'view'}/`)
  
  // if (to.path.startsWith(`/articles/${status[index*-1 + 1] || 'view'}/`)) {
  //   console.log("Redirecting to previous path:", from.path)
  //   return navigateTo(`/articles/${status[index]}/${article?._id}`) 
  // }
  // else {
  //   return
  // }
  return
})

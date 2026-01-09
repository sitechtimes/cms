
export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return

    const articleStore = useArticleStore()
    const userStore = useUserStore()

    if (articleStore.articles.length === 0) {
        articleStore.fetchArticles()
    }

    const article = articleStore.articles.find(a => a._id === to.params.id)

    console.log("Article Middleware Triggered for article:", article, userStore.user)

    if (article?.status === 'draft') {
        console.log("Article is in draft status")

        if (userStore.user?.id == article?.userId) {
            console.log("User is author, allowing edit")
            return navigateTo(article?._id ? `/articles/edit/${article?._id}` : `/articles/` )   
        } 
        else {
            console.log("User is not author, redirecting to home")
            return navigateTo(`/`)
        }
    }

    else if (article?.status === 'review') {
        console.log("Article is in review status")

        if (userStore.user?.id == article?.userId) {
            console.log("User is author, redirecting to edit")
            return navigateTo(`/articles/edit/${article?._id}`)
        }
        else {
            console.log("User is not author, redirecting to review")
            return navigateTo(`/articles/review/${article?._id}`)
        }
    }

    else {
        console.log("Article is ready")

        return navigateTo(`/articles/${article?._id}`)
    }
})

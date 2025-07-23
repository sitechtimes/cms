<template>
  <div>
    <div class="container mx-auto">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="min-w-0 flex-1">
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div class="mt-5 flex py-2 lg:mt-0 lg:ml-4">
            <button
              type="button"
              @click="createArticle"
              class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              <svg
                class="mr-2 -ml-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Create New Article
            </button>
          </div>
        </div>
      </div>

      <main>
        <TabPanel @tabClicked="tabClicked" />

        <!--   table  -->
        <div class="px-4 pt-6" v-if="tabId === 1">
          <Table title="Draft">
            <ArticleRow
              v-for="article in sortArticles('draft')"
              :article="article"
              :key="article.id"
            />
          </Table>

          <Table title="In Review">
            <ArticleRow
              v-for="article in sortArticles('review')"
              :article="article"
              :key="article.id"
            />
          </Table>

          <Table title="Ready">
            <ArticleRow
              v-for="article in sortArticles('ready')"
              :article="article"
              :key="article.id"
            />
          </Table>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 2">
          <Table title="">
            <ArticleRow
              v-for="article in reviewArticles"
              :article="article"
              :key="article.id"
            />
          </Table>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 3">
          <Table title="">
            <ArticleRow
              v-for="article in readyArticles"
              :article="article"
              :key="article.id"
            />
          </Table>
        </div>
      </main>
    </div>
    <RouterLink to="/auth/signin">link to the signin page</RouterLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const tabId = ref(1)
const articles = ref([])
const reviewArticles = ref([])
const readyArticles = ref([])
const auth = useUserStore()
const router = useRouter()

const sortArticles = (status: any) => {
  return articles.value.filter((article) => article.status === status)
}

const createArticle = async () => {
  try {
    const article = await $fetch(`/cms`, {
      method: 'POST',
    })
    router.push(`/articles/${article.data.id}`)
  } catch (e) {
    console.log(e)
  }
}

const tabClicked = (id: number) => {
  tabId.value = id
}

onMounted(async () => {
  try {
    const articlesData = await requestEndpoint(`http://localhost:3000/cms/`)
    console.log(articlesData)
    // articles.value = articlesData.data

    // if (auth.user === undefined) {
    //   throw new Error('undefines am i right?')
    // }

    // if (['editor', 'admin'].includes(auth.user.role)) {
    //   const reviewData = await useFetch('cms/review')
    //   reviewArticles.value = reviewData.data
    // }

    // if (auth.user.role === 'admin') {
    //   const readyData = await useFetch('cms/ready')
    //   readyArticles.value = readyData.data
    // }
  } catch (e) {
    console.error(e)
    if (e.response?.status === 401) auth.logOut()
  }
})
</script>

<style scoped></style>

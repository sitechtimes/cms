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
            <RowsArticleRow
              v-for="article in sortArticles('draft')"
              :article="article"
              :key="article._id"
            />
          </Table>

          <Table title="In Review">
            <RowsArticleRow
              v-for="article in sortArticles('review')"
              :article="article"
              :key="article._id"
            />
          </Table>

          <Table title="Ready">
            <RowsArticleRow
              v-for="article in sortArticles('ready')"
              :article="article"
              :key="article._id"
            />
          </Table>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 2">
          <Table title="">
            <RowsArticleRow
              v-for="article in reviewArticles"
              :article="article"
              :key="article._id"
            />
          </Table>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 3">
          <Table title="">
            <RowsArticleRow
              v-for="article in readyArticles"
              :article="article"
              :key="article._id"
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
const articles = ref<Article[]>([])
const reviewArticles = ref<Article[]>([])
const readyArticles = ref<Article[]>([])
const auth = useUserStore()
const router = useRouter()

function sortArticles(status: string) {
  return articles.value.filter((article) => article.status === status)
}

async function createArticle() {
  try {
    const article = await requestEndpoint<Article>(`cms/`, 'POST')

    router.push(`/articles/${article._id}`)
  } catch (e) {
    console.log(e)
  }
}

const tabClicked = (id: number) => {
  tabId.value = id
}

onMounted(async () => {
  try {
    const articlesData = await requestEndpoint<Article[]>(`cms/`)

    articles.value = articlesData

    if (auth.user === undefined) {
      throw new Error('undefines am i right?')
    }

    if (['editor', 'admin'].includes(auth.user.role)) {
      const reviewData = await requestEndpoint<Article[]>('cms/review')
      reviewArticles.value = reviewData
    }

    if (auth.user.role === 'admin') {
      const readyData = await requestEndpoint<Article[]>('cms/ready')
      readyArticles.value = readyData
    }
  } catch (e: any) {
    console.error(e)
    if (e.response?.status === 401) auth.logOut()
  }
})
</script>

<style scoped></style>

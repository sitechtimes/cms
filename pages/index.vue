<template>
  <div>
    <div class="container mx-auto">
      <div class="mx-auto max-w-3xl px-5 py-8 sm:px-6 md:max-w-7xl">
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div class="min-w-0 flex-1">
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <button
            type="button"
            @click="createArticle"
            class="du-btn du-btn-primary w-fit gap-2 rounded-lg text-white"
          >
            <Icon
              name="tabler:plus"
              style="color: white"
              :customize="customize"
            ></Icon>
            <span class="h-fit w-fit">Create New Article</span>
          </button>
        </div>
      </div>

      <main>
        <DashboardTabPanel
          @tabClicked="tabClicked"
          :titles="tabs"
          :selectedId="tabId"
        />

        <!--   DashboardTable  -->
        <div class="px-4 pt-6" v-if="tabId === 1">
          <div
            class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border"
          >
            <table class="du-table">
              <thead>
                <tr>
                  <th>Draft</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <DashboardRowsArticleRow
                    v-for="article in sortArticles('draft')"
                    :article="article"
                    :key="article._id"
                  />
                </tr>
              </tbody>
            </table>
          </div>

          <DashboardTable title="In Review">
            <DashboardRowsArticleRow
              v-for="article in sortArticles('review')"
              :article="article"
              :key="article._id"
            />
          </DashboardTable>

          <DashboardTable title="Ready">
            <DashboardRowsArticleRow
              v-for="article in sortArticles('ready')"
              :article="article"
              :key="article._id"
            />
          </DashboardTable>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 2">
          <DashboardTable title="">
            <DashboardRowsArticleRow
              v-for="article in reviewArticles"
              :article="article"
              :key="article._id"
            />
          </DashboardTable>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 3">
          <DashboardTable title="">
            <DashboardRowsArticleRow
              v-for="article in readyArticles"
              :article="article"
              :key="article._id"
            />
          </DashboardTable>
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
const tabs: string[] = ['My Articles', 'In Review', 'Ready']
const articles = ref<Article[]>([])
const reviewArticles = ref<Article[]>([])
const readyArticles = ref<Article[]>([])

const userStore = useUserStore()
const router = useRouter()

function sortArticles(status: string) {
  return articles.value.filter((article) => article.status === status)
}

async function createArticle() {
  try {
    const article = await requestEndpoint<Article>(`/cms`, 'POST')

    router.push(`/articles/${article._id}`)
  } catch (e) {
    console.error(e)
  }
}

function tabClicked(id: number) {
  tabId.value = id
}

onMounted(async () => {
  try {
    const articlesData = await requestEndpoint<Article[]>(`/cms`)

    articles.value = articlesData

    if (userStore.user === undefined) {
      throw new Error('undefines am i right?')
    }

    if (['editor', 'admin'].includes(userStore.user.role)) {
      const reviewData = await requestEndpoint<Article[]>('/cms/review')
      reviewArticles.value = reviewData
    }

    if (userStore.user.role === 'admin') {
      const readyData = await requestEndpoint<Article[]>('/cms/ready')
      readyArticles.value = readyData
    }
  } catch (e: any) {
    console.error(e)
    if (e.response?.status === 401) userStore.logOut()
  }
})
</script>

<style scoped></style>

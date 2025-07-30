<template>
  <div>
    <div class="mx-auto max-w-7xl px-4">
      <div class="mx-auto max-w-3xl px-5 py-8 md:max-w-7xl">
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>

          <button
            type="button"
            @click="createArticle"
            class="du-btn du-btn-primary w-fit gap-2 rounded-lg text-white"
          >
            <Icon
              name="tabler:plus"
              class="text-white"
              :customize="customize"
            />
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
        <div class="px-4 pt-2" v-if="tabId === 0">
          <div>
            <DashboardTable title="Draft">
              <DashboardRowsArticle
                v-for="article in sortArticles('draft')"
                :article="article"
                :key="article._id"
                v-if="sortArticles('draft').length > 0"
              />
            </DashboardTable>
            <p v-if="sortArticles('draft').length === 0">
              <img
                src="https://i.imgflip.com/a1ql3t.jpg"
                title="made at imgflip.com"
              />
            </p>
          </div>

          <div>
            <DashboardTable title="In Review">
              <DashboardRowsArticle
                v-for="article in sortArticles('review')"
                :article="article"
                :key="article._id"
                v-if="sortArticles('review').length > 0"
              />
            </DashboardTable>
            <p v-if="sortArticles('review').length === 0">
              <img
                src="https://i.imgflip.com/a1ql3t.jpg"
                title="made at imgflip.com"
              />
            </p>
          </div>

          <div>
            <DashboardTable title="Ready">
              <DashboardRowsArticle
                v-for="article in sortArticles('ready')"
                :article="article"
                :key="article._id"
                v-if="sortArticles('ready').length > 0"
              />
            </DashboardTable>
            <p v-if="sortArticles('ready').length === 0">
              <img
                src="https://i.imgflip.com/a1ql3t.jpg"
                title="made at imgflip.com"
              />
            </p>
          </div>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 1">
          <div v-if="reviewArticles.length > 0">
            <DashboardTable title="">
              <DashboardRowsArticle
                v-for="article in reviewArticles"
                :article="article"
                :key="article._id"
              />
            </DashboardTable>
          </div>

          <p v-if="reviewArticles.length === 0">NMO DIDDY ARTICLE</p>
        </div>

        <div class="px-4 pt-2" v-if="tabId === 2">
          <div v-if="readyArticles.length > 0">
            <DashboardTable title="">
              <DashboardRowsArticle
                v-for="article in readyArticles"
                :article="article"
                :key="article._id"
              />
            </DashboardTable>
          </div>

          <p v-if="readyArticles.length === 0">NMO DIDDY ARTICLE</p>
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
type Status = 'draft' | 'review' | 'ready'

const tabId = ref(0)
const tabs = ['My Articles', 'In Review', 'Ready'] as const
const articles = ref<Article[]>([])
const reviewArticles = ref<Article[]>([])
const readyArticles = ref<Article[]>([])

const userStore = useUserStore()
const router = useRouter()

function sortArticles(status: Status) {
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

<template>
  <div>
    <DashboardHeader />
    <div v-if="userStore.user">
      <TabPanel
        v-if="['editor', 'admin'].includes(userStore.user.role)"
        v-model="chosenTab"
        :names="names"
      />
      <SearchBar v-if="chosenTab <= 2" :articles="articleSets[chosenTab]" />
      <SearchBar v-if="chosenTab = 3" :published-articles="articleSets[3]" />

      <DashboardMyArticles v-if="chosenTab === 0" />
      <DashboardFilteredArticles
        v-if="chosenTab === 1"
        status="review"
        :article-list="articleSets[chosenTab]"
      />
      <DashboardFilteredArticles
        v-if="chosenTab === 2"
        status="ready"
        :article-list="articleSets[chosenTab]"
      />
      <DashboardPublishedArticles
        v-if="chosenTab === 3 && articleStore.publishedArticle"
        :response="articleStore.publishedArticle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const chosenTab = ref(0)

const userStore = useUserStore()
const articleStore = useArticleStore()

const names = ref(['My Articles', 'In Review'])

const articleSets = computed(() => [
  articleStore.articles,
  articleStore.reviewArticles,
  articleStore.readyArticles,
  articleStore.publishedArticle,
])

onMounted(() => {
  if (userStore.user && userStore.user.role === 'admin') {
    names.value.push('Ready', 'Published')
  }
})
</script>

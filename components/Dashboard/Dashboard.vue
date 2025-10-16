<template>
  <div>
    <DashboardHeader />
    <div v-if="userStore.user">
      <TabPanel
        v-if="['editor', 'admin'].includes(userStore.user.role)"
        v-model="chosenTab"
        :names="names"
      />
      <DashboardMyArticles v-if="chosenTab === 0" />
      <DashboardFilteredArticles
        v-if="chosenTab === 1"
        status="review"
        :article-list="articleStore.reviewArticles"
      />
      <DashboardFilteredArticles
        v-if="chosenTab === 2"
        status="ready"
        :article-list="articleStore.readyArticles"
      />
      <DashboardPublishedArticles
        v-if="chosenTab === 3"
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

onMounted(() => {
  if (userStore.user && userStore.user.role === 'admin') {
    names.value.push('Ready', 'Published')
  }
})
</script>

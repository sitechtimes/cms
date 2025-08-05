<template>
  <div>
    <DashboardHeader />
    <TabPanel
      v-model="chosenTab"
      :names="['My Articles', 'In Review', 'Ready']"
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
  </div>
</template>

<script setup lang="ts">
const chosenTab = ref(0)

const articleStore = useArticleStore()
</script>

<template>
  <div v-for="status in statuses" :key="status" class="px-4 pt-2">
    <DashboardTable
      v-if="articleStore.sortArticles(status).length > 0"
      :title="status"
    >
      <DashboardArticleRows
        v-for="article in articleStore.sortArticles(status)"
        :key="article._id"
        :article="article"
      />
    </DashboardTable>

    <div
      v-if="articleStore.sortArticles(status).length === 0"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      <h2 class="px-2 text-xl font-bold capitalize">{{ status }}</h2>
      <p class="pl-2">
        You have no articles in
        <span class="capitalize">{{ status }}</span
        >.
      </p>
    </div>
  </div>
  <div>
    <DashboardTable v-if="articleStore.publishedArticle" :title="'Published'">
      <DashboardArticleRows
        v-for="article in articleStore.sortArticles(status)"
        :key="article._id"
        :article="article"
      />
    </DashboardTable>

    <div
      v-if="articleStore.sortArticles(status).length === 0"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      <h2 class="px-2 text-xl font-bold capitalize">{{ status }}</h2>
      <p class="pl-2">
        You have no articles in
        <span class="capitalize">{{ status }}</span
        >.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const statuses = ['draft', 'review', 'ready'] as const

const articleStore = useArticleStore()

onMounted(() => articleStore.fetchArticles())
</script>

<style scoped></style>

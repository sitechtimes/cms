<template>
  <div v-for="status in statuses" :key="status" class="px-4 pt-2">
    <DashboardTable v-if="sortArticles(status).length > 0" title="Draft">
      <DashboardArticleRows
        v-for="article in sortArticles(status)"
        :key="article._id"
        :article="article"
      />
    </DashboardTable>

    <div
      v-if="sortArticles(status).length === 0"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      <h2 class="text-l px-2 font-bold capitalize">{{ status }}</h2>
      <p>
        You have no articles in
        <span class="capitalize">{{ status }}</span
        >.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const statuses = ['draft', 'review', 'ready'] as const

const { fetchArticles, sortArticles } = useDashboardArticles()

onMounted(() => fetchArticles())
</script>

<style scoped></style>

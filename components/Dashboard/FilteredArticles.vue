<template>
  <div class="px-4 pt-2">
    <div v-if="articleList.length > 0">
      <DashboardTable title="">
        <DashboardArticleRows
          v-for="article in articleList"
          :key="article._id"
          :article="article"
        />
      </DashboardTable>
    </div>

    <div
      v-if="articleList.length === 0"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      There are no {{ status }} articles.
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: Status
  articleList: Article[]
}>()
</script>

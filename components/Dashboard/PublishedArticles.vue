<template>
  <div class="px-4 pt-2">
    <div v-if="response.articles.length > 0">
      <DashboardTable title="">
        <DashboardArticleRows
          v-for="article in response"
          :key="article._id"
          :article="article"
        />
      </DashboardTable>
    </div>

    <div
      v-if="articleList.length === 0"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      There are no published articles.
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  response: response
}>()

console.log(props.articleList)
</script>

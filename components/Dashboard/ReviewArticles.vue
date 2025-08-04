<template>
  <div class="px-4 pt-2">
    <div v-if="reviewArticles.length > 0">
      <DashboardTable title="">
        <DashboardArticleRows
          v-for="article in reviewArticles"
          :key="article._id"
          :article="article"
        />
      </DashboardTable>
    </div>

    <p
      v-if="reviewArticles.length === 0"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      There are no articles in review.
    </p>
  </div>
</template>

<script setup lang="ts">
const { reviewArticles } = useDashboardArticles()
</script>

<template>
  <div>
    <main><ArticleComponent :article="article" /></main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const article = ref<Article>()
const route = useRoute()

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )
})
</script>

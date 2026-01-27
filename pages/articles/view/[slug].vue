<template>
  <div>
    <main v-if="article">
      <PublishedArticleComponent :article="article" />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
  middleware: 'published-article',
})

const article = ref<PublishedArticle>()
const route = useRoute()

article.value = await requestEndpoint<PublishedArticle>(
  `/articles/${route.params.slug}`,
  'GET'
)
</script>

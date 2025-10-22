<template>
  <div>
    <main v-if="article"></main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const article = ref<PublishedArticle>()
const route = useRoute()

onBeforeMount(async () => {
  article.value = await requestEndpoint<PublishedArticle>(
    `/articles/${route.params.slug}`,
    'GET'
  )
})
</script>

<template>
  <div>
    <main v-if="article && user">
      <ArticleActions :article="article" :user="user" />
      <ArticleComponent :article="article" />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const article = ref<Article>()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const route = useRoute()

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )
})
</script>

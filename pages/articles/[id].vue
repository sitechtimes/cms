<template>
  <div>
    <main v-if="article && user">
      <div class="mx-auto flex max-w-3xl justify-between pt-8 md:max-w-7xl">
        <h1 class="text-3xl font-bold text-gray-900">Article Preview</h1>
        <ArticleActions :article="article" :user="user" :toggle="true" />
      </div>

      <ArticleComponent :article="article" />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
  middleware: 'article',
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

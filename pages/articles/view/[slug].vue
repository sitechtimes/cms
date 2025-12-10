<template>
  <div>
    <main v-if="article && user">
      <div class="mx-auto flex max-w-3xl justify-between pt-8 md:max-w-7xl">
        <h1 class="text-3xl font-bold text-gray-900">Article Preview</h1>
        <ArticleActions
          :article="article"
          :user="user"
          :toggle="true"
          :published="true"
        />
      </div>
      <PublishedArticleComponent :article="article" />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const article = ref<PublishedArticle>()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const route = useRoute()

article.value = await requestEndpoint<PublishedArticle>(
  `/articles/${route.params.slug}`,
  'GET'
)
</script>

<template>
  <div class="mx-auto max-w-3xl py-8 md:max-w-7xl">
    <div v-if="article">
      <img v-if="article.imageUrl" :src="article.imageUrl" alt="" />
      <div>
        <Icon name="heroicons:user-16-solid" class="relative top-0.5 h-5 w-5" />
        {{ article.customAuthor }}
      </div>
    </div>
    <div ref="contentRef"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const article = ref<Article>()
const route = useRoute()

const contentRef = useTemplateRef('contentRef')

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )
  console.log(article.value)
  if (contentRef.value) {
    contentRef.value.innerHTML = article.value.content
  }
})
</script>

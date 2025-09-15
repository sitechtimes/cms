<template>
  <div :style="" class="mx-auto max-w-3xl py-8 md:max-w-7xl">
    <div class="du-badge">{{ article?.category }}</div>
    <div ref="titleRef" class="m-auto mb-3.5 text-5xl font-semibold"></div>
    <div v-if="article">
      <img
        v-if="article.imageUrl"
        :src="article.imageUrl"
        alt=""
        class="w-3xl rounded-2xl"
      />
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

const titleRef = useTemplateRef('titleRef')
const contentRef = useTemplateRef('contentRef')

computed(() => {
  return 'background-color: var(--' + article.value?.category + ')'
})

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )

  if (contentRef.value) {
    contentRef.value.innerHTML = article.value.content
  }

  if (titleRef.value) {
    titleRef.value.innerHTML = article.value.title
  }
})
</script>

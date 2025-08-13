<template>
  <div></div>
</template>

<script setup lang="ts">
const article = ref<Article>()
const route = useRoute()

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )
})
</script>

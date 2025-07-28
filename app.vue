<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()

useHead({
  title: route.meta.title
    ? `sitechtimes cms - ${route.meta.title}`
    : `sitechtimes cms`,
})
</script>

<style scoped></style>

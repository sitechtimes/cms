<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const userStore = useUserStore()

useHead({
  title: route.meta.title
    ? `sitechtimes cms - ${route.meta.title}`
    : `sitechtimes cms`,
})

onMounted(() => {
  const loadedUser = localStorage.getItem('user')
  if (loadedUser !== null) userStore.user = JSON.parse(loadedUser)
})
</script>

<style scoped></style>

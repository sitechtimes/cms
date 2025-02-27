<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

onMounted(() => {
  // authStore.user = useCookie('user')
})
</script>

<style scoped></style>

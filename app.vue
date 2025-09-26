<template>
  <div data-theme="light" class="min-h-screen w-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
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

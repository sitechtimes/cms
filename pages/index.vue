<template>
  <div>
    <h1 class="text-3xl">dashboard goes here</h1>
    <RouterLink to="/auth/signin">link to the signin page</RouterLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const userStore = useUserStore()

onMounted(async () => {
  console.log(userStore.user)

  const data = await requestEndpoint('/cms')
  console.log(data)
})
</script>

<style scoped></style>

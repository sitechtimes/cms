<template>
  <div>
    <h1 class="text-3xl">dashboard goes here</h1>
    <RouterLink to="/auth/signin">link to the signin page</RouterLink>
  </div>
</template>

<script setup lang="ts">
onMounted(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await requestEndpoint<any>('articles/homepage')
  console.log(data)
})
</script>

<style scoped></style>

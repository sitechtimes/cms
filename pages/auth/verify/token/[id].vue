<template>
  <div
    class="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-900 text-gray-200"
  >
    <Transition appear name="slide-fade">
      <div v-if="!status" key="loading" class="flex items-center gap-4">
        <span class="du-loading du-loading-spinner size-8" />
        <h1 class="text-3xl font-semibold">Verifying...</h1>
      </div>
      <div v-else key="loaded">
        <div
          v-if="status === 'verified'"
          class="flex flex-col items-center gap-2"
        >
          <h1 class="text-3xl font-semibold">Successfully verified!</h1>
          <p class="text-gray-400">
            You can close this tab now, or
            <RouterLink to="/dashboard" class="text-gray-200 underline"
              >head to your dashboard</RouterLink
            >
          </p>
        </div>
        <div v-else class="flex flex-col items-center gap-2">
          <h1 class="text-3xl font-semibold">Something went wrong.</h1>
          <p class="text-gray-400">
            I don't know what to do if something goes wrong actually. Good luck
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const status = ref('')

onMounted(() => {
  setTimeout(() => {
    status.value = 'verified'
  }, 5000)
})
</script>

<style scoped></style>

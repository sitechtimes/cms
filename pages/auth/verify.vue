<template>
  <div class="h-screen w-screen bg-gray-900 text-gray-300">
    <!-- there'sn't a token -->
    <Transition appear name="fade" class="w-full">
      <div
        v-if="!token && loaded"
        class="align-center flex h-full flex-col justify-center"
      >
        <main
          class="flex flex-auto items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8"
        >
          <div>
            <h1 class="sm:text-4.5xl mb-4 text-3xl font-bold text-white">
              Please verify your email
            </h1>
            <p class="mx-auto mb-8 max-w-lg">
              You should get a confirmation email soon; open it up and
              <strong class="font-bold"
                >click the link in the confirmation email</strong
              >
              so we can get you into your dashboard.
            </p>
          </div>
        </main>
        <footer class="fixed bottom-10 mx-auto flex w-full justify-center">
          <div
            class="mx-4 flex max-w-lg flex-row items-center gap-4 rounded-md bg-gray-800 px-4 py-2 text-sm md:mx-0"
          >
            <Icon name="heroicons-outline:mail" size="48" />
            <p>
              <strong class="font-semibold">Don't see it yet?</strong>
              It might be in your spam folder (ugh) — if so, make sure to click
              “not spam” so our updates actually make it to your inbox.
            </p>
          </div>
        </footer>
      </div>
    </Transition>

    <!-- there's a token -->
    <div
      v-if="token"
      class="flex h-screen w-screen items-center justify-center overflow-hidden"
    >
      <Transition appear name="fade">
        <div v-if="!status" key="loading" class="flex items-center gap-4">
          <span class="du-loading du-loading-spinner size-8" />
          <h1 class="text-3xl font-semibold text-white">Verifying...</h1>
        </div>
        <div v-else key="loaded">
          <div
            v-if="status === 'verified'"
            class="flex flex-col items-center gap-2"
          >
            <h1 class="text-3xl font-semibold text-white">
              Successfully verified!
            </h1>
            <p class="text-gray-400">
              You can close this tab now, or
              <RouterLink to="/dashboard" class="text-gray-200 underline"
                >head to your dashboard</RouterLink
              >
            </p>
          </div>
          <div v-else class="flex flex-col items-center gap-2">
            <h1 class="text-3xl font-semibold text-white">
              Something went wrong.
            </h1>
            <p class="text-gray-400">
              I don't know what to do if something goes wrong actually. Good
              luck
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const status = ref('')
const token = ref('')
const loaded = ref(false)

onMounted(() => {
  // token param should never be an array, but whatever
  if (route.query.token instanceof Array) return alert('what have you done D:')
  token.value = route.query.token ?? ''
  loaded.value = true

  setTimeout(() => (status.value = 'you are bad'), 2000)
})
</script>

<style scoped></style>

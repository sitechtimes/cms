<template>
  <div class="h-screen w-screen bg-gray-900 text-gray-300">
    <!-- there'sn't a token -->
    <Transition appear name="fade" class="w-full">
      <div
        v-if="!token && loaded"
        class="align-center flex h-full flex-col justify-center"
      >
        <main
          class="flex flex-auto flex-col items-center justify-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8"
        >
          <img
            class="mx-auto h-32 w-auto"
            src="~/assets/img/logo.svg"
            alt="A cartoon seagull with a hat obscuring its eyes and a newspaper in its beak"
          />
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
            <button
              id="resend"
              class="flex w-full cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
              :disabled="cooldown > 0 || cooldown === -1"
              @click="resend(true)"
            >
              Resend confirmation email
              {{ cooldown > 0 ? `(wait ${cooldown}s)` : '' }}
            </button>
          </div>
        </main>
        <footer class="fixed bottom-10 mx-auto flex w-full justify-center">
          <button @click="userStore.signOut">SIGN OUT</button>
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
              <RouterLink to="/" class="text-gray-200 underline"
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
const userStore = useUserStore()
const interval = ref<NodeJS.Timeout>()
const cooldown = ref(-1)

// FOR TESTING ERROR SCREEN
/* onMounted(() => {
  // token param should never be an array, but whatever
  if (route.query.token instanceof Array) return alert('what have you done D:')

  setTimeout(() => (status.value = 'you are bad'), 2000)
}) */

function setCooldown(timestamp: number) {
  cooldown.value = Math.max(0, Math.ceil((timestamp - Date.now()) / 1000))
  clearInterval(interval.value) // in case the user does shenanigans and undisables the button
  if (cooldown.value > 0)
    interval.value = setInterval(() => {
      if (cooldown.value < 1) {
        clearInterval(interval.value)
        return
      }
      cooldown.value--
    }, 1000)
}

async function resend(newToken: boolean) {
  cooldown.value = -1
  try {
    const response = await userStore.requestVerification(newToken)

    if (response.verified && userStore.user?.role !== undefined)
      userStore.user.verified = true

    setCooldown(response.time)
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  resend(false)

  if (route.query.token instanceof Array) return alert('what have you done D:')
  token.value = route.query.token ?? ''

  if (token.value) await userStore.verifyToken(token.value)

  loaded.value = true
})
</script>

<style scoped>
button:disabled {
  @apply cursor-not-allowed opacity-50;
}
</style>

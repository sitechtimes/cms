<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
  >
    <main class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-24 w-auto"
          src="~/assets/img/logo.svg"
          alt="A cartoon seagull with a hat obscuring its eyes and a newspaper in its beak"
        />
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h1>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="signIn">
        <div class="-space-y-px rounded-md shadow-sm">
          <div key="email">
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="du-input w-full rounded-b-none border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              placeholder="Email address"
            />
          </div>
          <div key="password">
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="du-input w-full rounded-t-none border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            type="submit"
          >
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon
                name="heroicons:lock-closed-solid"
                class="h-5 w-5 text-indigo-400 group-hover:text-indigo-300"
              />
            </div>
            Sign in
          </button>
        </div>

        <!-- <div class="flex items-center justify-center">
          <p class="mr-1 block text-sm text-gray-900">Don't have an account?</p>
          <RouterLink
            class="text-sm text-indigo-600 hover:text-indigo-400 cursor-pointer"
            to="/auth/signup"
          >
            Too bad!
          </RouterLink>
        </div> -->
      </form>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'sign in',
})

const router = useRouter()

const email = ref('')
const password = ref('')

const userStore = useUserStore()

async function signIn() {
  try {
    await userStore.signIn(email.value, password.value)
    router.push('/')
  } catch (e) {
    // todo: add error handling (booooo)
    console.error(e)
  }
}
</script>

<style scoped></style>

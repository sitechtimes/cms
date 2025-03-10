<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <main class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-24 w-auto"
          src="~/assets/img/logo_thicker.svg"
          alt="A cartoon seagull with a hat obscuring its eyes and a newspaper in its beak"
        />
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign In
        </h1>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="signIn">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div key="email">
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-t-md"
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            type="submit"
          >
            <div class="absolute left-0 inset-y-0 flex items-center pl-3">
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
})

const email = ref('')
const password = ref('')

const userStore = useUserStore()

async function signIn() {
  try {
    await userStore.signIn(email.value, password.value)
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped></style>

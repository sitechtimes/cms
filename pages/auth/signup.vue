<template>
  <div
    class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
  >
    <main class="flex w-full max-w-md flex-col gap-8">
      <div>
        <img
          class="mx-auto h-24 w-auto"
          src="~/assets/img/logo.svg"
          alt="A cartoon seagull with a hat obscuring its eyes and a newspaper in its beak"
        />
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h1>
      </div>

      <form class="space-y-6" @submit.prevent="signUp">
        <div class="du-join du-join-vertical w-full -space-y-px">
          <div key="name">
            <label for="name" class="sr-only">Name</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="du-input du-join-item w-full border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              placeholder="Name"
            />
          </div>
          <div key="email">
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="du-input du-join-item w-full border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
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
              class="du-input du-join-item w-full border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            class="du-btn group w-full bg-indigo-600 text-sm font-medium text-white contain-content hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            <div class="absolute inset-y-0 left-0 ml-3 flex items-center">
              <Icon
                name="heroicons:lock-closed-solid"
                class="h-5 w-5 text-indigo-400 group-hover:text-indigo-300"
              />
            </div>
            Sign up
          </button>
        </div>
      </form>

      <div class="flex items-center justify-center">
        <p class="mr-1 block text-sm text-gray-900">
          Already have an account?
          <RouterLink
            class="cursor-pointer text-sm text-indigo-600 hover:underline"
            to="/auth/signin"
          >
            Sign In
          </RouterLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  title: 'sign up',
})

const name = ref('')
const email = ref('')
const password = ref('')

const userStore = useUserStore()
const router = useRouter()

async function signUp() {
  try {
    await userStore.signUp(name.value, email.value, password.value)

    await userStore.signIn(email.value, password.value)

    await router.push('/auth/verify')
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped></style>

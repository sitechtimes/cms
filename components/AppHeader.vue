<template>
  <header class="bg-gray-800">
    <nav class="du-navbar mx-auto w-full px-4 shadow-sm lg:w-4/5">
      <div class="flex-none">
        <img class="mx-auto h-8 w-auto" src="~/assets/img/logo.svg" alt="" />
      </div>
      <div class="ml-4 flex-1">
        <NuxtLink
          to="/"
          class="du-btn text-md border-0 bg-gray-900 text-gray-100 shadow-none"
          >Home</NuxtLink
        >
      </div>
      <div class="flex-none">
        <details
          v-if="user"
          class="du-dropdown du-dropdown-bottom du-dropdown-end"
        >
          <summary class="du-avatar w-10 cursor-pointer">
            <img class="rounded-full" :src="user.imageUrl" alt="" />
          </summary>
          <ul
            class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 mt-1 w-52 p-2 shadow-sm"
          >
            <li><NuxtLink to="/profile">Your Profile</NuxtLink></li>
            <li><NuxtLink to="/users">Users</NuxtLink></li>
            <li><a>Sign Out</a></li>
          </ul>
        </details>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

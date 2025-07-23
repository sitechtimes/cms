<template>
  <header class="bg-gray-800">
    <nav class="du-navbar mx-auto w-[80%] px-6 shadow-sm">
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
        <details class="du-dropdown du-dropdown-bottom">
          <summary class="du-avatar w-10 cursor-pointer">
            <img class="rounded-full" :src="pfp" alt="" />
          </summary>
          <ul
            class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </details>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const pfp = userStore.user?.imageUrl
</script>

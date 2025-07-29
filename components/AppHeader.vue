<template>
  <header class="bg-gray-800">
    <nav
      class="du-navbar mx-auto max-w-3xl px-5 md:px-2 lg:max-w-4xl xl:max-w-7xl"
    >
      <div class="">
        <img class="mx-auto h-auto w-10" src="~/assets/img/logo.svg" alt="" />
      </div>
      <div class="ml-4 flex-1">
        <NuxtLink
          to="/"
          class="du-btn text-md rounded-lg border-0 bg-gray-900 text-gray-100 shadow-none"
        >
          Home
        </NuxtLink>
      </div>
      <div>
        <details
          v-if="user"
          class="du-dropdown du-dropdown-bottom du-dropdown-end"
          ref="dropdown"
        >
          <summary class="du-avatar h-auto w-10 cursor-pointer">
            <img class="rounded-full" :src="user.imageUrl" alt="" />
          </summary>
          <ul
            class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 mt-1 w-50 p-2 shadow-sm"
          >
            <li @click="closeDropdown">
              <NuxtLink to="/profile">Your Profile</NuxtLink>
            </li>
            <li @click="closeDropdown">
              <NuxtLink to="/users">Users</NuxtLink>
            </li>
            <li @click="closeDropdown">
              <button @click="userStore.signOut">Sign Out</button>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const dropdown = useTemplateRef('dropdown')

function closeDropdown() {
  dropdown.value?.removeAttribute('open')
}
</script>

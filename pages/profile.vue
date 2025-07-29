<template>
  <div>
    <div class="container mx-auto max-w-3xl py-8 md:max-w-7xl">
      <div class="lg:flex lg:items-center lg:justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
      </div>
      <div class="mt-5 grid md:mt-0 md:grid-cols-2">
        <div class="space-y-6 py-5">
          <div v-for="attribute in attributes" v-if="user">
            <label class="block text-sm font-medium text-gray-700 capitalize">
              {{ attribute }}
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                disabled="true"
                class="block w-full flex-1 rounded border border-gray-300 px-3 py-3 sm:text-sm"
                :value="user[attribute]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const attributes: (keyof User)[] = ['email', 'name', 'role']
</script>

<template>
  <div class="mx-auto max-w-3xl py-8 md:max-w-7xl">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Edit Article</h1>
      <div>
        <button class="du-btn">
          <Icon name="heroicons:link-16-solid" /> View
        </button>
        <div class="du-dropdown du-dropdown-end">
          <div tabindex="0" role="button" class="du-btn m-1">Options</div>
          <ul
            tabindex="0"
            class="du-dropdown-content du-menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700"> Title </label>
      <div class="mt-1 flex w-80 rounded-md shadow-sm md:w-100 lg:w-120">
        <input
          type="text"
          class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
        />
      </div>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700">
        Custom Author
      </label>
      <div class="mt-1 flex w-80 rounded-md shadow-sm md:w-100 lg:w-120">
        <input
          type="text"
          class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
        />
      </div>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700"> Category </label>
      <select class="du-select mt-1 capitalize shadow">
        <option v-for="topic in topics">
          {{ topic }}
        </option>
      </select>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700"> Category </label>
      <div class="mt-1 rounded border border-gray-300 shadow">
        <MilkdownProvider>
          <MilkdownEditor />
        </MilkdownProvider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue'

definePageMeta({
  layout: 'navbar',
})

const topics = [
  'feature',
  'news',
  'school',
  'entertainment',
  'lifestyle',
  'opinion',
  'science',
  'technology',
] as const
</script>

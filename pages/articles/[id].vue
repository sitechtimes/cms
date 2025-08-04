<template>
  <div class="mx-auto max-w-3xl py-8 md:max-w-7xl">
    <div class="lg:flex lg:items-center lg:justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Edit Article</h1>
    </div>
    <div class="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
      <label class="text-md block font-medium text-gray-700"> Title </label>
      <div class="mt-1 flex w-2/5 rounded-md shadow-sm">
        <input
          type="text"
          class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
        />
      </div>
    </div>
    <div class="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
      <label class="text-md block font-medium text-gray-700">
        Custom Author
      </label>
      <div class="mt-1 flex w-2/5 rounded-md shadow-sm">
        <input
          type="text"
          class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
        />
      </div>
    </div>
    <div class="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
      <label class="text-md block font-medium text-gray-700"> Category </label>
      <select class="du-select mt-1 capitalize">
        <option v-for="topic in topics">
          {{ topic }}
        </option>
      </select>
    </div>
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
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

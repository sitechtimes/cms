<template>
  <div class="py-4px-4 mx-auto max-w-7xl py-4 sm:px-6 lg:px-8">
    <h1 class="text-l px-2 font-bold">{{ title }}</h1>
    <div class="mx-auto max-w-7xl py-6">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full align-middle sm:px-6 lg:px-8">
            <div
              class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="divide-y divide-gray-200 bg-white">
                  <slot></slot>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="mx-auto flex max-w-7xl flex-col gap-4 p-4">
    <h2 class="text-l px-2 font-bold capitalize">{{ title }}</h2>
    <div class="mx-auto w-full max-w-7xl">
      <div
        class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border shadow-sm"
      >
        <table class="du-table">
          <tbody>
            <slot />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

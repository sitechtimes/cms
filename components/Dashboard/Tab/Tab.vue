<template>
  <div class="du-tabs du-tabs-border">
    <input type="radio" name="my_tabs_2" class="du-tab" aria-label="aweawe" />
    <div
      class="du-tab-content cursor-pointer border-b-2 px-6 py-3 text-sm font-bold text-gray-500 focus:outline-none"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  isActive: boolean
}>()
</script>

<style scoped></style>

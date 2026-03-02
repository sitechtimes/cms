<template>
  <div class="mx-auto flex max-w-7xl items-center px-4">
    <div class="du-tabs du-tabs-border flex-1">
      <input
        v-for="(label, i) in names"
        :key="i"
        :name="label"
        type="radio"
        class="du-tab hover:text-primary du-tabs-border text-md font-semibold"
        :aria-label="label"
        :checked="model === i"
        @click="changeModel(i)"
      />
    </div>
    <div class="ml-4"><SearchButton :chosen-tab="chosenTab" /></div>
    <SearchBar
      v-if="isOpen"
      :articles="articleSets[chosenTab]"
      :chosen-tab="chosenTab"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  names: string[]
  chosenTab: number
}>()

const model = defineModel<number>()

function changeModel(i: number) {
  model.value = i
}
</script>

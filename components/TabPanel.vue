<template>
  <div class="du-tabs du-tabs-border py-2">
    <input
      v-for="(label, i) in names"
      :name="label"
      type="radio"
      class="du-tab"
      :aria-label="label"
      @click="changeModel(i)"
      :checked="model === i"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  names: string[]
}>()

const model = defineModel<number>()

function changeModel(i: number) {
  model.value = i
}
</script>

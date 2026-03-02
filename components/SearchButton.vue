<template>
  <div>
    <Icon
      name="heroicons:magnifying-glass-16-solid"
      size="18"
      class="mt-2"
      @click="toggle"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  chosenTab: number
}>()

const isOpen = ref(false)
const emit = defineEmit()

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:isOpen', isOpen.value)
}
</script>

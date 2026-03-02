<template>
  <div
    class="transition-duration-200 mt-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-300"
  >
    <Icon
      name="heroicons:magnifying-glass-16-solid"
      size="18"
      @click="toggle"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  chosenTab: number
}>()

const isOpen = ref(false)
const emit = defineEmits(['update:isOpen'])

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:isOpen', isOpen.value)
}
</script>

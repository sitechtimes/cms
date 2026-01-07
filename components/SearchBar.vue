<template>
  <div>
    <label class="input">
      <svg
        class="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </g>
      </svg>

      <input v-model="search" type="search" placeholder="Search" />
    </label>

    <ul class="mt-4">
      <li v-for="a in filteredArticles" :key="a._id">
        {{ a.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  article: Article[]
}>()

const search = ref('')

const filteredArticles = computed(() => {
  if (!search.value) return props.article

  return props.article.filter((a) =>
    a.title.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

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
    <div class="mx-auto flex max-w-7xl flex-col gap-4 p-4">
      <DashboardTable title="">
        <DashboardArticleRows
          v-for="a in searchedArticles"
          :key="a._id"
          :article="a"
        />
      </DashboardTable>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  articles?: Article[]
  publishedArticles?: PublishedArticle[]
}>()

// const articleStore = useArticleStore()

const search = ref('')

const searchedArticles = computed(() => {
  if (!search.value) return

  if (props.articles)
    return props.articles.filter((a) =>
      a.title.toLowerCase().includes(search.value.toLowerCase())
    )

  if (props.publishedArticles)
    return props.publishedArticles.filter((a) =>
      a.title.toLowerCase().includes(search.value.toLowerCase())
    )
  else return ''
})
</script>

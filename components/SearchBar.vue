<template>
  <div class="my-5 flex flex-col items-center">
    <label
      class="input flex w-8/12 items-center gap-2 rounded-xl border-2 border-gray-200 p-2"
    >
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

      <input
        v-model="search"
        type="text"
        class="flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-neutral-400"
        placeholder="Search"
      />
      <button
        v-if="search"
        @click="search = ''"
        type="button"
        class="flex h-5 w-5 items-center justify-center text-gray-400 transition hover:text-gray-600"
      >
        ✕
      </button>
    </label>
    <div
      v-if="chosenTab <= 2"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      <DashboardTable title="">
        <DashboardArticleRows
          v-for="a in searchedArticles"
          :key="a._id"
          :article="a"
        />
      </DashboardTable>
    </div>
    <div
      v-if="chosenTab === 3"
      class="mx-auto flex max-w-7xl flex-col gap-4 p-4"
    >
      <DashboardTable title="">
        <DashboardPublishedArticleRows
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
  chosenTab: number
}>()

const search = ref('')

watch(
  () => props.chosenTab,
  () => {
    search.value = ''
  }
)

const searchedArticles = computed(() => {
  if (!search.value || (!props.articles && !props.publishedArticles)) return []
  if (props.articles && !props.publishedArticles)
    return props.articles.filter((a) =>
      a.title.toLowerCase().includes(search.value.toLowerCase())
    )
  if (!props.articles && props.publishedArticles)
    return props.publishedArticles.filter((p) =>
      p.title.toLowerCase().includes(search.value.toLowerCase())
    )

  return []
})
</script>

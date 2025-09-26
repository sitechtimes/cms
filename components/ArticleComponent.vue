<template>
  <div class="mx-auto max-w-3xl py-8 md:max-w-7xl">
    <div
      class="du-badge du-badge-lg cursor-default text-white capitalize transition duration-200 ease-in-out hover:-translate-y-2"
      :class="[
        article?.category
          ? categoryMap[article.category as keyof typeof categoryMap]
          : '',
      ]"
    >
      {{ article?.category }}
    </div>
    <article class="prose max-w-[56%]">
      <div ref="titleRef" class="m-auto mb-3.5 text-5xl font-semibold"></div>
      <div v-if="article" class="my-8">
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          alt=""
          class="w-3xl rounded-2xl"
        />
        <div>
          <span class="mr-6">
            <Icon
              name="heroicons:user-16-solid"
              class="relative top-0.5 h-5 w-5"
            />
            {{ article.customAuthor }}
          </span>
          <span>
            <Icon
              name="heroicons:clock-16-solid"
              class="relative top-0.5 h-5 w-5"
            />
            {{ formattedDate }}
          </span>
        </div>
      </div>

      <div ref="contentRef"></div>
    </article>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  article: Article
}>()

const titleRef = useTemplateRef('titleRef')
const contentRef = useTemplateRef('contentRef')

const categoryMap = {
  news: 'bg-[var(--news)]',
  feature: 'bg-[var(--feature)]',
  entertainment: 'bg-[var(--entertainment)]',
  lifestyle: 'bg-[var(--lifestyle)]',
  opinion: 'bg-[var(--opinion)]',
  science: 'bg-[var(--science)]',
  technology: 'bg-[var(--technology)]',
  school: 'bg-[var(--school)]',
} as const

const options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}
const today = new Date()
const formattedDate = today.toLocaleDateString('en-US', options)

onBeforeMount(async () => {
  if (contentRef.value) {
    contentRef.value.innerHTML = props.article.content
  }

  if (titleRef.value) {
    titleRef.value.innerHTML = props.article.title
  }
})
</script>

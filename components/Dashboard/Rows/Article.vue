<template>
  <tr class="h-12">
    <td
      class="w-fit min-w-40 overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap text-gray-900"
    >
      {{ article.title }}
    </td>

    <td class="w-60 min-w-40 text-sm text-gray-900">
      {{ formatDate }}
    </td>

    <td class="w-40 min-w-32">
      <span
        class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 capitalize"
      >
        {{ article.status }}
      </span>
    </td>

    <td class="w-40 min-w-20 text-right text-sm font-medium whitespace-nowrap">
      <NuxtLink
        class="text-indigo-600 hover:text-indigo-900"
        :to="`/articles/${article._id}`"
      >
        {{ articleActionText }}
      </NuxtLink>
    </td>
  </tr>

</template>

<script setup lang="ts">
const props = defineProps<{ article: Article }>()

const formatDate = computed(() => {
  const date = new Date(props.article.updatedAt)

  const formattedDate = date.toLocaleString('en', {
    month: 'short',
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return formattedDate
})

const articleActionText = computed(() => {
  if (props.article.status === 'draft') return 'Edit'
  if (props.article.status === 'review' || 'ready') return 'View'
})
</script>

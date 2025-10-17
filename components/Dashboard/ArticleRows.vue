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
        v-if="article.status === 'draft'"
        class="text-indigo-600 hover:text-indigo-900"
        :to="`/articles/edit/${article._id}`"
      >
        Edit
      </NuxtLink>
      <NuxtLink
        v-if="article.status === 'review' || article.status === 'ready'"
        class="text-indigo-600 hover:text-indigo-900"
        :to="`/articles/${article._id}`"
      >
        View
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
</script>

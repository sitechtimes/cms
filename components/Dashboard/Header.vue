<template>
  <div class="mx-auto max-w-7xl px-4">
    <div class="mx-auto max-w-3xl px-5 py-8 md:max-w-7xl">
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>

        <button
          type="button"
          class="du-btn du-btn-primary w-fit gap-2 rounded-lg text-white"
          @click="createArticle"
        >
          <Icon name="tabler:plus" class="text-white" :customize="customize" />
          <span class="h-fit w-fit">Create New Article</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

async function createArticle() {
  try {
    const article = await requestEndpoint<Article>(`/cms`, 'POST')

    router.push(`/articles/edit/${article._id}`)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div v-if="article && user" class="mx-auto max-w-3xl py-8 md:max-w-7xl">
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Edit Article</h1>
      <ArticleActions :article="article" :user="user" :toggle="false" />
    </div>
    <div v-if="article.editorResponses.length != 0 && article.status === 'review'" class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700"> Editor Notes </label>
      <div class="mt-1 flex flex-col w-140 rounded-md shadow-md md:w-160 lg:w-180 flex-wrap">
          <h3 class="flex justify-between items-start gap-2 px-3 py-3 whitespace-normal break-words"
              v-for="response in article.editorResponses" 
              :key="response.name"
              >
              <span class="flex-1 break-words">
                  {{ response.name }}: {{ response.text }}
              </span>
          </h3>
      </div>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700"> Title </label>
      <div class="mt-1 flex w-80 rounded-md shadow-sm md:w-100 lg:w-120">
        <input
          v-model="article.title"
          type="text"
          class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
        />
      </div>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700">
        Custom Author
      </label>
      <div class="mt-1 flex w-80 rounded-md shadow-sm md:w-100 lg:w-120">
        <input
          v-model="article.customAuthor"
          type="text"
          class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
        />
      </div>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700"> Category </label>
      <select
        v-model="article.category"
        class="du-select mt-1 capitalize shadow"
      >
        <option v-for="topic in topics" :key="topic">
          {{ topic }}
        </option>
      </select>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700">
        Upload Image
      </label>
      <fieldset class="du-fieldset mt-1">
        <input
          ref="file"
          type="file"
          class="du-file-input"
          multiple
          @change="changeImage"
        />
        <label class="du-label">Max size 2MB</label>
      </fieldset>
    </div>
    <img
      v-if="article.imageUrl"
      class="mb-4 w-100 rounded-lg"
      :src="article.imageUrl"
      :alt="article.imageAlt ?? 'Article Image'"
    />
    <div v-if="article.imageUrl" class="mb-6 max-w-7xl">
      <label class="text-md block font-medium text-gray-700">
        Image Description
      </label>
      <div class="mt-1 flex w-80 rounded-md shadow-sm md:w-100 lg:w-120">
        <input
          v-model="article.imageAlt"
          type="text"
          class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
        />
      </div>
    </div>
    <div class="max-w-7xl rounded border border-gray-300 shadow">
      <ToastEditor v-model="article.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
  middleware: 'article',
})

const fileSelection = useTemplateRef('file')

const route = useRoute()

const article = ref<Article>()
const userStore = useUserStore()
const modals = useModalStore()
const { user } = storeToRefs(userStore)

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )

  modals.setArticle(article.value)
})

function changeImage() {
  const file = fileSelection.value?.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      article.value!.imageUrl = reader.result as string
    }
    reader.readAsDataURL(file)
  }
}

const topics = [
  'feature',
  'news',
  'school',
  'entertainment',
  'lifestyle',
  'opinion',
  'science',
  'technology',
] as const
</script>

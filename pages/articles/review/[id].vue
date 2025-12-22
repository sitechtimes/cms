<template>
  <div>
    <main v-if="article && user" class="mx-auto max-w-3xl py-8 md:max-w-7xl">
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Review Article</h1>
        <ArticleActions :article="article" :user="user" :toggle="false" />
      </div>
      <div v-if="article.editorResponses.length !== 0" class="max-w-7xl py-4">
        <label class="text-md block font-medium text-gray-700">
          Editor Notes
        </label>
        <div
          class="mt-1 flex w-140 flex-col flex-wrap rounded-md shadow-md md:w-160 lg:w-180"
        >
          <h3
            class="flex items-start justify-between gap-2 px-3 py-3 break-all whitespace-normal"
            v-for="response in article.editorResponses"
            :key="response.name"
          >
            <span class="flex-1 break-all">
              {{ response.name }}: {{ response.text }}
            </span>

            <button
              v-if="response.name === user.name"
              class="shrink-0 pl-2 text-2xl leading-none font-bold text-gray-500 hover:text-red-500"
              @click="deleteNotes(response)"
            >
              <Icon name="heroicons:x-mark-16-solid" />
            </button>
            <button
              v-if="response.name !== user.name"
              class="shrink-0 pl-2 text-2xl leading-none font-bold text-gray-300"
            >
              <Icon name="heroicons:x-mark-16-solid" />
            </button>
          </h3>
        </div>
      </div>
      <div class="max-w-7xl py-4">
        <label class="text-md block font-medium text-gray-700">
          Add Editor Notes
        </label>
        <div class="mt-1 flex w-80 rounded-md md:w-100 lg:w-120">
          <input
            v-model="newNote"
            type="text"
            class="du-input text-md block flex-1 rounded border border-gray-300 py-3 pl-3 shadow-sm"
            @keydown="handleKeydown"
          />
          <button
            class="du-btn du-btn-success ml-2 shadow-sm"
            @click="saveNewNote"
          >
            Send
          </button>
        </div>
      </div>
      <ArticleComponent :article="article" />
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const route = useRoute()

const article = ref<Article>()
const userStore = useUserStore()

const modals = useModalStore()
const newNote = ref<string>('')

const { user } = storeToRefs(userStore)

function deleteNotes(response: { name: string; text: string }) {
  if (response.name !== userStore.user?.name) return

  const index = article.value?.editorResponses.findIndex(
    (note) => note === response
  )
  if (index === undefined || index === -1) return

  article.value?.editorResponses.splice(index, 1)
  requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
}

async function saveNewNote() {
  if (newNote.value.trim() === '') return

  article.value?.editorResponses.push({
    name: userStore.user?.name || 'Anonymous',
    text: newNote.value.trim(),
  })
  newNote.value = ''

  modals.saveArticle()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    saveNewNote()
  }
}

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )

  if (
    article.value.editorResponses === undefined ||
    article.value.editorResponses === null
  ) {
    article.value.editorResponses = []
  }

  modals.setArticle(article.value)
})
</script>

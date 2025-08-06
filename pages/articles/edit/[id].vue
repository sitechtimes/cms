<template>
  <div v-if="article" class="mx-auto max-w-3xl py-8 md:max-w-7xl">
    <dialog class="du-modal" ref="modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE
        </h3>
        <p class="py-4">THIS ACTION IS IRREVERSIBLE AND CANNOT BE UNDONE</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              @click="deleteArticle"
              class="du-btn bg-red-500 text-white hover:bg-red-600"
            >
              DELETE
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" class="du-modal-backdrop">
        <button></button>
      </form>
    </dialog>
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold text-gray-900">Edit Article</h1>
      <div>
        <NuxtLink :to="`/articles/${route.params.id}`" class="du-btn text-md">
          <Icon class="" name="heroicons:link-16-solid" />View
        </NuxtLink>
        <details class="du-dropdown du-dropdown-end" ref="dropdown">
          <summary class="du-btn m-1">Options</summary>
          <ul
            class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li @click="(closeDropdown, saveArticle)">
              <button>Save Article</button>
            </li>
            <li @click="(closeDropdown, sendToReview)">
              <button>Send to Review</button>
            </li>
            <li @click="(closeDropdown, confirmArticleDeletion)">
              <button>Delete Article</button>
            </li>
          </ul>
        </details>
      </div>
    </div>
    <div class="max-w-7xl py-4">
      <label class="text-md block font-medium text-gray-700"> Title </label>
      <div class="mt-1 flex w-80 rounded-md shadow-sm md:w-100 lg:w-120">
        <input
          type="text"
          v-model="article.title"
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
          type="text"
          v-model="article.customAuthor"
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
        <option v-for="topic in topics">
          {{ topic }}
        </option>
      </select>
    </div>

    <div class="mt-5 max-w-7xl rounded border border-gray-300 shadow">
      <QuillEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: 'navbar',
})

const dropdown = useTemplateRef('dropdown')
const modal = useTemplateRef('modal')

const article = ref<Article>()

onBeforeMount(async () => {
  article.value = await requestEndpoint<Article>(
    `/cms/${route.params.id}`,
    'GET'
  )
})

function closeDropdown() {
  dropdown.value?.removeAttribute('open')
}

/* {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  customAuthor: {
    type: String,
    required: false,
    trim: true,
  },
  user: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  imageUrl: {
    type: String,
    required: false,
  },
  imageAlt: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: Object.values(Category),
    required: true,
  }, */

async function saveArticle() {
  requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
}

function sendToReview() {}

function confirmArticleDeletion() {
  modal.value?.showModal()
}

function deleteArticle() {}

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

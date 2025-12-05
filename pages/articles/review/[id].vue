<template>
    <div>
        <main v-if="article" class="mx-auto max-w-3xl py-8 md:max-w-7xl">
            <dialog ref="modal" class="du-modal">
                <div class="du-modal-box w-full max-w-lg">
                    <h3 class="text-lg font-bold">
                    ARE YOU SURE YOU WANT TO SEND THIS TO READY
                    </h3>
                    <p class="py-4">THEY (THE RADICALS) MIGHT SEE THIS</p>
                    <div class="du-modal-action">
                    <form method="dialog">
                        <button
                        class="du-btn bg-orange-500 text-white hover:bg-orange-600"
                        @click="sendToReady"
                        >
                        SEND
                        </button>
                    </form>
                    </div>
                </div>
                <form method="dialog" class="du-modal-backdrop">
                    <button></button>
                </form>
            </dialog>
            <div class="flex justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Review Article</h1>
                <div>
                    <details ref="dropdown" class="du-dropdown du-dropdown-end">
                    <summary class="du-btn m-1">Options</summary>
                    <ul
                        class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 w-52 p-2 shadow-sm"
                    >
                        <li @click="confirmSend">
                        <button>Send to Ready</button>
                        </li>
                    </ul>
                    </details>
                </div>
            </div>
            <div v-if="article.editorResponses.length != 0" class="max-w-7xl py-4">
                <label class="text-md block font-medium text-gray-700"> Editor Notes </label>
                <div class="mt-1 flex flex-col w-80 rounded-md shadow-md md:w-100 lg:w-120">
                    <h3 class="text-md flex-1 px-3 py-3" v-for="response in article.editorResponses" :key="response.name">
                        {{ response.name }}: {{ response.text }}
                    </h3>
                </div>
            </div>
            <div class="max-w-7xl py-4">
                <label class="text-md block font-medium text-gray-700"> Add Editor Notes </label>
                <div class="mt-1 flex w-80 rounded-md shadow-sm md:w-100 lg:w-120">
                    <input
                    v-model="newNote"
                    type="text"
                    class="du-input text-md block flex-1 rounded border border-gray-300 px-3 py-3"
                    />
                </div>
                <button> Send </button>
            </div>
            <ArticleComponent :article="article" />
            
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'navbar',
})

const article = ref<Article>()
const route = useRoute()
const newNote = ref<string>('')

const dropdown = useTemplateRef('dropdown')
const modal = useTemplateRef('modal')

function closeDropdown() {
  dropdown.value?.removeAttribute('open')
}

function confirmSend() {
  closeDropdown()
  modal.value?.showModal()
}

function sendToReady() {
  if (article.value) {
    article.value.status = 'ready'
    requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
  }
//   startMessage('Article sent for review.')
}

onBeforeMount(async () => {
    article.value = await requestEndpoint<Article>(
        `/cms/${route.params.id}`,
        'GET'
    )
    
    console.log('Fetched article:')
    console.log(article.value)
})
</script>

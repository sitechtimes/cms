<template>
    <div>
        <main v-if="article" class="mx-auto max-w-3xl py-8 md:max-w-7xl">
            <dialog ref="modal1" class="du-modal">
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
             <dialog ref="modal2" class="du-modal">
                <div class="du-modal-box w-full max-w-lg">
                    <h3 class="text-lg font-bold">
                    ARE YOU SURE YOU WANT TO SEND THIS TO READY
                    </h3>
                    <p class="py-4">THEY (THE RADICALS) MIGHT SEE THIS</p>
                    <div class="du-modal-action">
                    <form method="dialog">
                        <button
                        class="du-btn bg-orange-500 text-white hover:bg-orange-600"
                        @click="sendToDraft"
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
                        <li @click="confirmSendtoDraft">
                        <button> Send to Draft </button>
                        </li>
                        <li @click="confirmSendtoReady">
                        <button> Send to Ready </button>
                        </li>
                    </ul>
                    </details>
                </div>
            </div>
            <div v-if="article.editorResponses.length != 0" class="max-w-7xl py-4">
                <label class="text-md block font-medium text-gray-700"> Editor Notes </label>
                <div class="mt-1 flex flex-col w-140 rounded-md shadow-md md:w-160 lg:w-180 flex-wrap">
                    <h3 class="flex justify-between items-start gap-2 px-3 py-3 whitespace-normal break-all"
                        v-for="response in article.editorResponses" 
                        :key="response.name"
                        >
                        <span class="flex-1 break-all">
                            {{ response.name }}: {{ response.text }}
                        </span>

                        <button 
                            class="shrink-0 pl-2 text-gray-500 hover:text-red-500 font-bold text-2xl leading-none"
                            @click="deleteNotes(response)"
                        >
                            <Icon name="heroicons:x-mark-16-solid" />                            
                        </button>
                    </h3>
                </div>
            </div>
            <div class="max-w-7xl py-4">
                <label class="text-md block font-medium text-gray-700"> Add Editor Notes </label>
                <div class="mt-1 flex w-80 rounded-md md:w-100 lg:w-120">
                    <input
                    v-model="newNote"
                    type="text"
                    class="du-input text-md block flex-1 shadow-sm rounded border border-gray-300 pl-3 py-3"
                    />
                    <button @click="saveArticle" class="ml-2 du-btn du-btn-success shadow-sm"> Send </button>
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

const userStore = useUserStore()
const modalStore = useModalStore()

const article = ref<Article>()
const newNote = ref<string>('')

const dropdown = useTemplateRef('dropdown')
const modal1 = useTemplateRef('modal')
const modal2 = useTemplateRef('modal')

function closeDropdown() {
  dropdown.value?.removeAttribute('open')
}

function confirmSendtoReady() {
  closeDropdown()
  modal1.value?.showModal()
}

function confirmSendtoDraft() {
  closeDropdown()
  modal2.value?.showModal()
}

function deleteNotes(response: { name: string; text: string }) {
  const index = article.value?.editorResponses.findIndex((note) => note === response)
  if (index === undefined || index === -1) return
  article.value?.editorResponses.splice(index, 1)
  requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
}

async function saveArticle() {
    if (newNote.value.trim() !== '') {
        article.value?.editorResponses.push({
        name: userStore.user?.name || 'Anonymous',
        text: newNote.value.trim(),
        })
        newNote.value = ''
    }
    console.log(article.value)
  requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
}

function sendToReady() {
  if (article.value) {
    article.value.status = 'ready'
    requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
  }
//   startMessage('Article sent for review.')
}

function sendToDraft() {
  if (article.value) {
    article.value.status = 'draft'
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

<template>
  <div>
    <ConfirmationMessage
      class="bg-green-300"
      icon="heroicons:check-circle-16-solid"
      :message="modals.confirmationMessage"
      :progress="modals.progress"
      @close="modals.confirmationMessage = ''"
    />
    <dialog :ref="refs.modal1" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE
        </h3>
        <p class="py-4">THIS ACTION IS IRREVERSIBLE AND CANNOT BE UNDONE</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-red-500 text-white hover:bg-red-600"
              @click="modals.deleteArticle"
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
    <dialog :ref="refs.modal2" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO SEND THIS TO REVIEW
        </h3>
        <p class="py-4">THEY MIGHT SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-orange-500 text-white hover:bg-orange-600"
              @click="modals.sendToReview"
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
    <dialog :ref="refs.modal3" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO PUBLISH THIS ARTICLE????
        </h3>
        <p class="py-4">EVERYONE MIGHT SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-green-500 text-white hover:bg-green-600"
              @click="modals.publishArticle"
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
    <dialog :ref="refs.modal4" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE THIS ARTICLE IS READY????
        </h3>
        <p class="py-4">SOMEONE WILL PROBABLY SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-fuchsia-500 text-white hover:bg-fuchsia-600"
              @click="modals.readyArticle"
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
    <div v-if="article && user">
      <span v-if="toggle === false">
        <NuxtLink
          :to="`/articles/${route.params.id}`"
          class="du-btn text-md"
          @click="modals.saveArticle"
        >
          <Icon class="align-middle" name="heroicons:link-16-solid" />View
        </NuxtLink>
      </span>
      <span v-if="toggle === true">
        <NuxtLink
          :to="`/articles/edit/${route.params.id}`"
          class="du-btn text-md"
        >
          <Icon class="align-middle" name="heroicons:link-16-solid" />Edit
        </NuxtLink>
      </span>
      <details :ref="refs.dropdown" class="du-dropdown du-dropdown-end">
        <summary class="du-btn m-1">Options</summary>
        <ul
          class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li v-if="article.status === 'ready'" @click="modals.confirmPublish">
            <button>Publish Article</button>
          </li>
          <li @click="modals.saveArticle">
            <button>Save Article</button>
          </li>
          <li v-if="article.status === 'draft'" @click="modals.confirmSend">
            <button>Send to Review</button>
          </li>
          <li
            v-if="article.status === 'review' && user.role === 'admin'"
            @click="modals.confirmReady"
          >
            <button>Send to Ready</button>
          </li>
          <li @click="modals.confirmArticleDeletion">
            <button>Delete Article</button>
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  article: Article
  user: User
  toggle: boolean
}>()

const route = useRoute()
const modals = useModalStore()

const refs = {
  modal1: ref<HTMLDialogElement | null>(null),
  modal2: ref<HTMLDialogElement | null>(null),
  modal3: ref<HTMLDialogElement | null>(null),
  modal4: ref<HTMLDialogElement | null>(null),
  dropdown: ref<HTMLDetailsElement | null>(null),
}

type Key = 'modal1' | 'modal2' | 'modal3' | 'modal4' | 'dropdown'

onMounted(() => {
  for (const key in refs) {
    modals[key as Key] = refs[key as Key].value
  }
})
</script>

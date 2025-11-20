<template>
  <div>
    <ConfirmationMessage
      class="bg-green-300"
      icon="heroicons:check-circle-16-solid"
      :message="editorFunctions.confirmationMessage.value"
      :progress="editorFunctions.progress.value"
      @close="editorFunctions.confirmationMessage.value = ''"
    />
    <dialog :ref="modals.modal1" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE
        </h3>
        <p class="py-4">THIS ACTION IS IRREVERSIBLE AND CANNOT BE UNDONE</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-red-500 text-white hover:bg-red-600"
              @click="editorFunctions.deleteArticle"
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
    <dialog :ref="modals.modal2" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO SEND THIS TO REVIEW
        </h3>
        <p class="py-4">THEY MIGHT SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-orange-500 text-white hover:bg-orange-600"
              @click="editorFunctions.sendToReview"
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
    <dialog :ref="modals.modal3" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO PUBLISH THIS ARTICLE????
        </h3>
        <p class="py-4">EVERYONE MIGHT SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-green-500 text-white hover:bg-green-600"
              @click="editorFunctions.publishArticle"
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
    <dialog :ref="modals.modal4" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE THIS ARTICLE IS READY????
        </h3>
        <p class="py-4">SOMEONE WILL PROBABLY SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-fuchsia-500 text-white hover:bg-fuchsia-600"
              @click="editorFunctions.readyArticle"
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
  </div>
</template>

<script setup lang="ts">
import { useArticleEditor } from '~/composables/useArticleEditor'
import unpack from '~/composables/unpacker'

const editor = useArticleEditor()
const editorFunctions = unpack(editor)

const modals = useModalStore()
</script>

<template>
  <div>
    <ConfirmationMessage
      class="bg-green-300"
      icon="heroicons:check-circle-16-solid"
      :message="confirmationMessage"
      :progress="progress"
      @close="confirmationMessage = ''"
    />
    <dialog ref="modal1" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO DELETE THIS ARTICLE
        </h3>
        <p class="py-4">THIS ACTION IS IRREVERSIBLE AND CANNOT BE UNDONE</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-red-500 text-white hover:bg-red-600"
              @click="deleteArticle"
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
    <dialog ref="modal2" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO SEND THIS TO REVIEW
        </h3>
        <p class="py-4">THEY MIGHT SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-orange-500 text-white hover:bg-orange-600"
              @click="sendToReview"
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
    <dialog ref="modal3" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO PUBLISH THIS ARTICLE????
        </h3>
        <p class="py-4">EVERYONE MIGHT SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-green-500 text-white hover:bg-green-600"
              @click="publishArticle"
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
    <dialog ref="modal4" class="du-modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE THIS ARTICLE IS READY????
        </h3>
        <p class="py-4">SOMEONE WILL PROBABLY SEE THIS</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              class="du-btn bg-fuchsia-500 text-white hover:bg-fuchsia-600"
              @click="readyArticle"
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

const router = useRouter()

const modal1 = useTemplateRef('modal1')
const modal2 = useTemplateRef('modal2')
const modal3 = useTemplateRef('modal3')
const modal4 = useTemplateRef('modal4')

const progress = ref(0)
const confirmationMessage = ref('')

async function readyArticle() {
  if (article.value) {
    article.value.status = 'ready'
    requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
  }
  startMessage('Article sent to ready!')
}

async function publishArticle() {
  closeDropdown()
  requestEndpoint(`/cms/${route.params.id}/publish`, 'POST')
  startMessage('Article published!')
}

function sendToReview() {
  if (article.value) {
    article.value.status = 'review'
    requestEndpoint(`/cms/${route.params.id}`, 'PUT', article.value)
  }
  startMessage('Article sent for review!')
}

function deleteArticle() {
  requestEndpoint(`/cms/${route.params.id}`, 'DELETE')
  router.push('/')
}

function startMessage(message: string) {
  confirmationMessage.value = message
  progress.value = 0

  const duration = 3000
  const startTime = performance.now()

  function update(now: DOMHighResTimeStamp) {
    const elapsed = now - startTime
    progress.value = Math.min(elapsed / duration, 1)
    if (elapsed < duration) {
      requestAnimationFrame(update)
    } else {
      confirmationMessage.value = ''
    }
  }

  requestAnimationFrame(update)
}
</script>

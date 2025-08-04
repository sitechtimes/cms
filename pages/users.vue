<template>
  <div>
    <dialog class="du-modal" ref="modal">
      <div class="du-modal-box w-full max-w-lg">
        <h3 class="text-lg font-bold">
          ARE YOU SURE YOU WANT TO DELETE THIS USER
        </h3>
        <p class="py-4">THIS ACTION IS IRREVERSIBLE AND CANNOT BE UNDONE</p>
        <div class="du-modal-action">
          <form method="dialog">
            <button
              @click="deleteUser"
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
    <div class="mx-auto max-w-3xl py-8 md:max-w-7xl">
      <div class="lg:flex lg:items-center lg:justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
      </div>
      <TabPanel :names="['Editors', 'Writers']" v-model="chosenTab" />
      <div class="" v-for="(role, i) in ['editor', 'writer']">
        <div
          class="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border"
          v-if="i === chosenTab"
        >
          <table class="du-table">
            <thead>
              <tr class="">
                <th class="w-120">Name</th>
                <th class="w-120">Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users?.filter((user) => user.role === role)">
                <th>{{ user.name }}</th>
                <td>{{ user.email }}</td>
                <td>
                  <div class="du-join du-join-horizontal">
                    <button
                      @click="promote(user.id)"
                      v-if="user.role === 'writer'"
                      class="du-btn du-join-item hover:bg-green-300/75"
                    >
                      Promote
                    </button>
                    <button
                      @click="demote(user.id)"
                      v-if="user.role === 'editor'"
                      class="du-btn du-join-item hover:bg-red-300/75"
                    >
                      Demote
                    </button>
                    <button
                      class="du-btn du-join-item hover:bg-red-500 hover:text-white"
                      @click="confirmUserDeletion(user.id)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'navbar',
})

const chosenTab = ref(0)

const users = ref<User[]>()

const modal = useTemplateRef('modal')

let currentUserId = ''

onMounted(async () => {
  users.value = await requestEndpoint<User[]>('/users', 'GET')
})

function promote(userID: string) {
  requestEndpoint(`/users/${userID}`, 'PUT', { role: 'editor' })
}

function demote(userID: string) {
  requestEndpoint(`/users/${userID}`, 'PUT', { role: 'writer' })
}

function confirmUserDeletion(userID: string) {
  modal.value?.showModal()
  currentUserId = userID
}

function deleteUser() {
  requestEndpoint(`/users/${currentUserId}`, 'DELETE', { role: 'writer' })
}
</script>

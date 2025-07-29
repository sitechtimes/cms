<template>
  <div>
    <div class="container mx-auto max-w-3xl py-8 md:max-w-7xl">
      <div class="lg:flex lg:items-center lg:justify-between">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
      </div>
      <TabPanel :names="['Editors', 'Writers']" v-model="chosenTab" />
      <div class="" v-for="(role, i) in ['editor', 'writer']">
        <table
          class="rounded-box border-base-content/5 bg-base-100 du-table overflow-x-auto border"
          v-if="i === chosenTab"
        >
          <thead>
            <tr>
              <th class="w-80">Name</th>
              <th class="w-80">Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users?.filter((user) => user.role === role)">
              <th>{{ user.name }}</th>
              <td>{{ user.email }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
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

onMounted(async () => {
  users.value = await requestEndpoint<User[]>('/users', 'GET')
})
</script>

<template>
  <tr>
    <td class="px-2 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ user.name }}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">
        {{ user.email }}
      </div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap">
      <span
        class="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800 capitalize"
      >
        {{ user.role }}
      </span>
    </td>

    <td
      class="px-4 py-4 text-right text-sm font-medium whitespace-nowrap"
      v-if="user.role === 'writer'"
    >
      <a
        @click="changeRole('editor')"
        class="cursor-pointer text-indigo-600 hover:text-indigo-900"
      >
        Promote
      </a>
    </td>

    <td
      class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap"
      v-if="user.role === 'editor'"
    >
      <a
        @click="changeRole('writer')"
        class="cursor-pointer text-red-600 hover:text-red-900"
      >
        Demote
      </a>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{ user: User }>()

async function changeRole(role: string) {
  try {
    await requestEndpoint(`/users/${props.user.id}`, 'PUT', {
      role: role,
    })

    props.user.role = role
  } catch (e) {
    console.error(e)
  }
}
</script>

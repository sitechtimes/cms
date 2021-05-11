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
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {{ capitalizeRole }}
        </span>
    </td>

      <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium" v-if="user.role === 'writer'">
        <a @click="changeRole('editor')" class="text-indigo-600 hover:text-indigo-900 cursor-pointer">Promote</a>
      </td>

      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" v-if="user.role === 'editor'">
        <a @click="changeRole('writer')" class="text-red-600 hover:text-red-900 cursor-pointer">Demote</a>
      </td>
  </tr>

</template>

<script>
  export default {
    name: 'UserRow',
    props: ['user'],
    methods: {
      // TODO: reload page after successfully changing role
      async changeRole(role){
        try {
          await this.$axios.put(`/users/${this.user.id}`, {
            role: role
          });

          this.user.role = role;
        }catch(e){
         console.log(e);
        }
      },
    },
    computed: {
      capitalizeRole() {
        return this.user.role.charAt(0).toUpperCase() + this.user.role.slice(1);
      }
    }
  }

</script>

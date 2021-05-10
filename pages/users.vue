<template>
  <div class="container mx-auto">
    <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl font-bold text-gray-900">Users</h1>
      </div>
    </div>

      <Table title="Writers" class="-my-6">
        <UserRow
          v-for="user in sortUsers('writer')"
          :user="user"
          :key="user.id"
        />
      </Table>

    <Table title="Editors" class="-my-6">
      <UserRow
        v-for="user in sortUsers('editor')"
        :user="user"
        :key="user.id"
      />
    </Table>


    </div>
</template>
<script>

  import Table from "../components/Table";
  import UserRow from "../components/rows/UserRow";

  export default {
    components: { UserRow, Table },
    layout: 'dashboard',
    middleware: ['mainAuth', 'admin'],
    data() {
      return {
        users: []
      }
    },
    async mounted() {
      const users = await this.$axios.get(`/users`);
      this.users = users.data;
    },
    methods: {
      sortUsers (role){
        return this.users.filter(user => {
          return user.role === role;
        });
      }
    }
  }
</script>

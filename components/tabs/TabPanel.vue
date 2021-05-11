<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    v-if="['editor', 'admin'].includes(this.$auth.user.role) ">
  <div class="flex flex-wrap">
    <div class="border-gray-500 w-full">

      <Tab :id="1" title="My Articles" :isActive=openTab  @tabClicked="toggleTabs" />
      <Tab :id="2" title="In Review"  :isActive=openTab  @tabClicked="toggleTabs"/>
      <Tab :id="3" title="Ready" :isActive=openTab @tabClicked="toggleTabs" v-if="this.$auth.user.role === 'admin'"/>

    </div>
  </div>
  </div>
</template>

<script>
  import Tab from "./Tab";
  export default {
    name: "TabPanel",
    components: { Tab } ,
    data() {
      return {
        openTab: 1
      };
    },
    methods: {
      toggleTabs (id) {
        this.openTab = id
        // emit to main parent
        this.$emit('tabClicked', this.openTab)
      }
    }
  };
</script>

<style></style>

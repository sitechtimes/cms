<template>
  <div>
    <AppHeader />
    <PanelNavigation />
    <Nuxt />
  </div>
</template>

<script>
import PanelNavigation from '../components/PanelNavigation';
import AppHeader from '../components/AppHeader';
export default {
  components:{
    PanelNavigation, AppHeader
  },
}
</script>

<style>

</style>
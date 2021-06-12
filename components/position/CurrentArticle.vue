<template>
  <p>Current Article: {{ this.category }} && {{ this.position }}</p>
</template>

<script>
export default {
  props: {
    position: String,
    category: String,
  },
  mounted() { this.currentHomepage() },
  beforeUpdate() { this.currentHomepage() },
  methods: {
    async currentHomepage() {
      // TODO: fetch current homepage article for category and position
      if (this.position !== null) {
        console.log(this.category, this.position)
      }
    }
  }
}
</script>

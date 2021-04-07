<template>
  <div>
    <h1>{{ article.title }}</h1>
    <p>{{ article.content }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: Object
    }
  },
  // TODO: add error handling
  async mounted() {
    try {
      const id  = this.$route.params.id;
      const article = await this.$axios.get(`/users/${this.$auth.user.id}/articles/${id}`);
      this.article = article.data;
    }catch (e){
      // TODO: if no such article exists send to 404 page
      console.log(e.response)
    }
  }
}
</script>

<template>
  <div>
    <p :class="textColor" class="block text-sm font-medium">{{ currentArticleMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    position: String,
    category: String,
  },
  data(){
    return {
      currentArticleTitle: ''
    }
  },
  watch: {
    position: function () {
      this.currentHomepage();
    }
  },
  methods: {
    async currentHomepage() {
      try {
        if (this.position !== null || this.position === 'none') {
          const categories = await this.$axios.get(`articles/homepage?category=${this.category}&position=${this.position}`);

          if(categories.data.length > 0) {
            this.currentArticleTitle = categories.data[0].title;
          }else{
            this.currentArticleTitle = null;
          }

        }
      }catch(e) { }
    }
  },
  computed: {
    currentArticleMessage() {
      if (this.currentArticleTitle) {
        return `Conflicting Article: ${this.currentArticleTitle}`;
      }

      return "No conflicting article"
    },
    textColor() {
      return this.currentArticleTitle ? 'text-red-600' : 'text-green-600'
    }
  }
}
</script>

<template>
  <h1>hello</h1>
</template>

<script>
  export default {
    async mounted() {
      try {
        const resp = await this.$axios.get(`/auth/verify/${this.$route.params.token}`);
        this.$auth.setUser(resp.data);

        if (this.$auth.user.verified) {
          await this.$router.push('/');
        } else {
          await this.$router.push('/auth/signup');
        }
      } catch(e){
      }
    }
  }
</script>

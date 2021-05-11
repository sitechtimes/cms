<template>
</template>

<script>
  export default {
    async mounted() {
      const resp = await this.$axios.get(`/auth/verify/${this.$route.params.token}`);
      this.$auth.setUser(resp.data);

      if (this.$auth.user.verified){
        await this.$router.push('/');
      }else{
        await this.$router.push('/auth/signup');
      }
    }
  }
</script>

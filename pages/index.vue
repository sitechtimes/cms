<template>
  <div class= "flex h-screen bg-gray-300">
    <div class="w-full max-w-xs m-auto bg-gray-100 rounded p-5">
      <form>
        <div>
          <input class="w-full p-2 mb-6 text-gold-400 border-b-2 border-yellow-400 font-bold outline-none focus:bg-gray-300" type="text" name="email" placeholder="email">
        </div>
        <div>
          <input class="w-full p-2 mb-6 text-gold-400 border-b-2 border-yellow-400 font-bold outline-none focus:bg-gray-300" type="text" name="password" placeholder="password">
        </div>
        <div>
          <input class="w-full bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-2 px-4 mb-6 rounded" type="submit">
        </div>
      </form>
      <footer>
        <ul>
          <li>
            <nuxt-link to="/" class="text-gray-400 hover:text-gray-700 font-bold text-sm float-right">Sign Up</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="text-gray-400 hover:text-gray-700 font-bold text-sm float-left">Reset Password</nuxt-link>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>

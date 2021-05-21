<template>
  <div class="h-screen bg-gray-900">
  <div class="h-full flex flex-col justify-center align-center">

  <main class="relative z-10 flex-auto flex items-center justify-center text-center text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
    <div>
      <img width="180" height="32" class="mx-auto mb-12" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow">
      <h1 class="text-3xl sm:text-4.5xl text-white font-extrabold mb-4">Thank you! Now check your email...</h1>
      <p class="mb-8 max-w-lg mx-auto">You should get a confirmation email soon, open it up and <strong class="font-semibold">click the link in the confirmation email </strong> so we can get you into your dashboard.</p>
    </div>
  </main>
  <footer class="relative z-10 flex-none pb-6 flex items-start justify-center text-gray-400 px-4 sm:px-6 lg:px-8">
    <svg width="32" height="32" fill="none" class="flex-none"><path d="M8.75 3.5H22V2H8.75v1.5zM3.5 23.25V8.75H2v14.5h1.5zM23 28.5h-2V30h2v-1.5zm-12 0H8.75V30H11v-1.5zm10 0h-5V30h5v-1.5zm-5 0h-5V30h5v-1.5zM2 23.25A6.75 6.75 0 008.75 30v-1.5a5.25 5.25 0 01-5.25-5.25H2zM23 30a5 5 0 005-5h-1.5a3.5 3.5 0 01-3.5 3.5V30zM22 3.5A4.5 4.5 0 0126.5 8H28a6 6 0 00-6-6v1.5zM8.75 2A6.75 6.75 0 002 8.75h1.5c0-2.9 2.35-5.25 5.25-5.25V2z" fill="#4B5563"/><path d="M14.75 12.75a2 2 0 012-2h10.5a2 2 0 012 2v7.5a2 2 0 01-2 2h-10.5a2 2 0 01-2-2v-7.5z" stroke="#9CA3AF" stroke-width="1.5"/><path d="M15.5 11.5l4.512 3.992a3 3 0 003.976 0L28.5 11.5" stroke="#9CA3AF" stroke-width="1.5"/><path d="M9 11v4M9 19v.01" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <p class="flex-auto text-sm ml-6 max-w-lg"><strong class="font-semibold text-gray-200">Don’t see it yet?</strong> It might be in your spam folder (ugh) – if so, make sure to click “not spam” so our updates actually make it to your inbox.</p>
  </footer>
  </div>
   </div>
</template>
<script>
 export default {
   middleware: ['guest']
 }
</script>

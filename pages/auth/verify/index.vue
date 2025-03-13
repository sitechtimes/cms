<template>
  <div
    class="align-center flex min-h-screen flex-col justify-center bg-gray-900"
  >
    <main
      class="flex flex-auto items-center justify-center px-4 py-16 text-center text-gray-300 sm:px-6 lg:px-8"
    >
      <div>
        <h1 class="sm:text-4.5xl mb-4 text-3xl font-bold text-white">
          Please verify your email
        </h1>
        <p class="mx-auto mb-8 max-w-lg">
          You should get a confirmation email soon; open it up and
          <strong class="font-bold"
            >click the link in the confirmation email</strong
          >
          so we can get you into your dashboard.
        </p>
      </div>
    </main>
    <footer
      class="fixed bottom-10 mx-auto flex w-full justify-center text-gray-300"
    >
      <div
        class="mx-4 flex max-w-lg flex-row items-center gap-4 rounded-md bg-gray-800 px-4 py-2 text-sm md:mx-0"
      >
        <Icon name="heroicons-outline:mail" size="48" />
        <p>
          <strong class="font-semibold text-gray-200">Don't see it yet?</strong>
          It might be in your spam folder (ugh) — if so, make sure to click “not
          spam” so our updates actually make it to your inbox.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

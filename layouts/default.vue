<script setup lang="ts">
</script>

<template>
  <div class="body">
    <NavBar />
    <main class="container text-center">
      <slot />
    </main>

    <PageFooter />
  </div>
</template>

<style lang="postcss" scoped>
.body{
  @apply bg-gray-100 flex flex-col min-h-screen
}
</style>

<script setup lang="ts">
</script>

<template>
  <div class="menu">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.menu{
  @apply flex items-center px-4 ml-3
}
</style>

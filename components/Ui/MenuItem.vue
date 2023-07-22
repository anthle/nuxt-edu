<script setup lang="ts">
defineProps<{
  active?: boolean
}>()
</script>

<template>
  <div class="menu-item" :class="{ 'menu-item-active': active }">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.menu-item{
  transition: all 0.2s;
  @apply py-1 px-2 mx-1 rounded hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200 cursor-pointer
}
.menu-item-active{
  @apply bg-blue-100 text-blue-700
}
</style>

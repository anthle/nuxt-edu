<script setup lang="ts">
const props = defineProps<{
  active?: boolean
}>()
</script>

<template>
  <div class="px-4 py-3 text-gray-700 text-sm cursor-pointer flex-shrink-0 hover:text-blue-500" :class="{ 'tab-item-active': active }">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.tab-item-active{
  border-bottom: 2px solid;
  @apply   border-blue-400 text-blue-400
}
</style>

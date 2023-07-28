<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div class="w-full flex overflow-auto bg-white ">
    <slot />
  </div>
</template>

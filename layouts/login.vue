<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="rounded-lg shadow-lg p-5 bg-white">
      <h4 class="pb-4 m-0 text-xl text-gray-500">
        {{ $route.meta.title || '登录' }}
      </h4>
      <slot />
    </div>
  </div>
</template>

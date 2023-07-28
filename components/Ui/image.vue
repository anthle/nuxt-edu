<script setup lang="ts">
interface Props {
  src: string
  objectFit?: string
}
withDefaults(defineProps<Props>(), {
  objectFit: 'cover',
})

function handleImageError(e: Event) {
  const imgElement = e.target as HTMLImageElement
  imgElement.src = '@/public/fail.png'
}
</script>

<template>
  <img :src="src" v-bind="$attrs" :style="{ 'object-fit': objectFit }" @error="handleImageError">
</template>

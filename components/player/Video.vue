<script setup lang="ts">
const props = defineProps<{
  url?: string
}>()

const player = ref(null)
onMounted(() => {
  player.value = new Player({
    id: 'mse',
    url: props.url,
    width: null,
    height: 450,
    playsinline: true,
  })
})
onUnmounted(() => {
  return player.value.destroy()
})
</script>

<template>
  <div id="mse" />
</template>

<script setup lang="ts">
const props = defineProps<{
  url?: string
}>()

const player = ref(null)
onMounted(() => {
  player.value = new FlvPlayer({
    id: 'video',
    url: props.url,
    isLive: true,
    playsinline: true,
    height: 450,
    width: null,
  })
})
onUnmounted(() => {
  return player.value.destroy()
})
</script>

<template>
  <div id="video" class="rounded" />
</template>

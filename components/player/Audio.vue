<script setup lang="ts">
const props = defineProps<{
  title?: string
  cover?: string
  url?: string
}>()

const ap = ref(null)
onMounted(() => {
  ap.value = new APlayer({
    container: document.getElementById('aplayer'),
    audio: [{
      name: props.title,
      artist: 'Messier64',
      url: props.url,
      cover: props.cover,
    }],
  })
})
onBeforeUnmount(() => {
  return ap.value.destroy()
})
</script>

<template>
  <div id="aplayer" />
</template>

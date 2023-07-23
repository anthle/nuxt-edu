import { createDiscreteApi } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref()
  nuxtApp.hook('app:mounted', () => {
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(['loadingBar'])
      bar.value = loadingBar
    }
  })
  nuxtApp.hook('page:start', () => {
    bar.value?.start()
  })
  nuxtApp.hook('page:finish', () => {
    setTimeout(() => {
      bar.value?.finish()
    }, 100)
  })
  nuxtApp.hook('app:error', () => {
    if (process.client) {
      setTimeout(() => {
        bar.value?.finish()
      }, 100)
    }
  })
})

import process from 'node:process'
import { createDiscreteApi } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  const bar = ref()
  nuxtApp.hook('app:mounted', (e) => {
    if (!bar.value) {
      const { loadingBar } = createDiscreteApi(['loadingBar'])
      bar.value = loadingBar
    }
  })
  nuxtApp.hook('page:start', () => {
    bar.value?.start()
  })
  nuxtApp.hook('page:finish', (e) => {
    setTimeout(() => {
      bar.value?.finish()
    }, 100)
  })
  nuxtApp.hook('app:error', (e) => {
    if (process.client) {
      setTimeout(() => {
        bar.value?.finish()
      }, 100)
    }
  })
})

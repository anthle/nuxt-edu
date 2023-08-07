// https://nuxt.com/docs/api/configuration/nuxt-config'
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - Messier64',
      title: 'Messier',
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-cn',
      },
    },
  },
  devtools: { enabled: true },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
        : ['@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
  imports: {
    dirs: ['apis'],
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})

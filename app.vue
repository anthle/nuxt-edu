<script setup>
import { NConfigProvider } from 'naive-ui'
</script>

<template>
  <div>
    <NConfigProvider inline-theme-disabled>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NConfigProvider>
  </div>
</template>

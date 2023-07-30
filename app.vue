<script setup>
import { NConfigProvider, NMessageProvider } from 'naive-ui'
</script>

<template>
  <div>
    <NConfigProvider inline-theme-disabled>
      <NuxtLayout>
        <NMessageProvider>
          <NuxtPage />
        </NMessageProvider>
      </NuxtLayout>
    </NConfigProvider>
  </div>
</template>

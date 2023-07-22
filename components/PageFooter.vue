<script setup lang="ts">
</script>

<template>
  <div class="mt-auto bg-slate-900">
    <div class="flex justify-center items-center py-5">
      <a v-for="item in 5" :key="item" href="#" class="p-3 text-gray-100 no-underline">友情链接</a>
    </div>
    <div class="container border flex justify-center items-center text-gray-100 py-5">
      <small>never too late to start over</small>
    </div>
  </div>
</template>

<style scoped>
.border{
  border-top: 1px solid rgb(55 65 81);
}
</style>

<script setup lang="ts">
import { NGi, NGrid, NSkeleton } from 'naive-ui'
</script>

<template>
  <NGrid :x-gap="20" :cols="2">
    <NGi v-for="i in 2" :key="i">
      <section class="shadow flex bg-white rounded mb-5 p-5">
        <NSkeleton width="108px" height="138px" class="rounded flex-shrink-0" />
        <div class="flex flex-col flex-1 pl-5">
          <NSkeleton width="50%" height="30px" class="my-2" />
          <div class="mt-auto flex items-center">
            <NSkeleton width="30px" text />
            <NSkeleton width="30px" class="my-2" />
            <NSkeleton width="100px" round size="medium" class="ml-auto" />
          </div>
        </div>
      </section>
    </NGi>
  </NGrid>
</template>

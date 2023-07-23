<script setup lang="ts">
interface Price {
  price: string
  through?: boolean
}

const props = withDefaults(defineProps<Price>(), {
  price: '0',
  through: false,
})

const handlePrice = computed(() => Number.parseFloat(props.price) === 0 ? '免费' : `¥${props.price}`)
</script>

<template>
  <div class="mt-2 flex items-center">
    <span :class="!through ? 'text-rose-500 font-bold' : 'text-gray-500 line-through ml-2 text-xs'">{{ handlePrice }}</span>
  </div>
</template>

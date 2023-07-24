<script setup>
const props = defineProps({
  max: {
    type: Number,
    default: 1,
  },
  value: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="flex gap-1">
    <p
      class="aspect-[2/1] bg-sky-500 flex font-bold h-12 items-center justify-center rounded-full text-2xl text-white"
    >
      {{ value }}/{{ max }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.circle {
  @apply aspect-square bg-sky-900 h-10 rounded-full;

  &.active {
    @apply bg-sky-500;
  }
}
</style>

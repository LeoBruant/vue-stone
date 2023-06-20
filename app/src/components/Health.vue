<script setup>
const props = defineProps({
  health: {
    type: Number,
    default: 30,
  },
  size: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <p
    class="aspect-square bg-red-500 border-4 border-neutral-700 flex font-bold h-16 items-center overflow-hidden justify-center relative rounded-full text-2xl text-white"
  >
    {{ health }}
  </p>
</template>

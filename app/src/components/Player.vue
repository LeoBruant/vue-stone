<script setup>
const props = defineProps({
  hp: {
    type: Number,
    default: 30,
  },
  name: {
    type: String,
    default: "",
  },
  position: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    :class="`fixed flex gap-2 items-center left-2 ${
      position === 'top' ? 'top-2' : 'bottom-2'
    }`"
  >
    <p class="font-bold text-2xl">{{ name }}</p>
    <p
      class="aspect-square bg-red-500 flex font-bold h-12 items-center overflow-hidden justify-center relative rounded-full text-2xl text-white"
    >
      {{ hp }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  max: {
    type: Number,
    default: 1,
  },
  position: {
    type: String,
    default: "",
  },
  value: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div
    :class="`fixed flex gap-1 items-center right-2 ${
      position === 'top' ? 'top-2' : 'bottom-2'
    }`"
  >
    <p
      class="aspect-[2/1] bg-sky-400 flex font-bold h-8 items-center justify-center rounded-full text-xl text-white"
    >
      {{ value }}/{{ max }}
    </p>
    <div class="flex gap-1">
      <div
        :class="`aspect-square h-8 rounded-full ${
          value >= i ? 'bg-sky-500' : 'bg-sky-900'
        }`"
        v-for="i in max"
      ></div>
    </div>
  </div>
</template>

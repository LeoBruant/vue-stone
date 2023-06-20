<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="flex after:border-8 after:border-transparent after:border-l-[0.75rem] after:border-l-black/50 after:border-y-[1.5rem] after:h-0"
  >
    <p class="bg-black/50 font-bold px-3 py-2 rounded-l text-2xl text-white">
      {{ name }}
    </p>
  </div>
</template>

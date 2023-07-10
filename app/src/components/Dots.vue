<script setup>
import { ref } from "vue";

const animationDelay = 150;
const dots = ref([]);
const number = 3;

for (let i = 0; i < number; i++) {
  dots.value.push(false);
}

dots.value.forEach((dot, index) => {
  setTimeout(() => {
    dots.value[index] = true;
  }, animationDelay * index);
});
</script>

<template>
  <div class="animate-pulse flex gap-1">
    <span v-for="(dot, index) in dots" v-show="dot" class="animate-bounce"
      >.</span
    >
  </div>
</template>

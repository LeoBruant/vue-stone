<script setup>
import Card from "@/components/Card.vue";

const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="bottom-2 fixed flex w-full justify-center z-10">
    <Card
      v-for="card in cards"
      state="hand"
      :title="card.title"
      @click="$emit('play', card)"
    />
  </div>
</template>

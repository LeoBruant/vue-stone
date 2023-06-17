<script setup>
import Card from "@/components/Card.vue";

const props = defineProps({
  cards: {
    type: Array,
    default: () => [],
  },
  mana: {
    type: Number,
    default: 0,
  },
  player: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div :class="`hand ${player ? ' hand--' + player : ''}`">
    <Card
      v-for="card in cards"
      :outlined="player === 'self' && mana >= card.cost"
      :side="player === 'opponent' ? 'back' : 'front'"
      state="hand"
      :title="card.title"
      @click="$emit('play', card)"
    />
  </div>
</template>

<style lang="scss" scoped>
.hand {
  @apply fixed flex w-full justify-center z-10;

  &--opponent {
    @apply top-2;
  }

  &--self {
    @apply bottom-2;
  }
}
</style>

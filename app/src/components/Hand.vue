<script setup>
import Card from "@/components/Card.vue";

const props = defineProps({
  player: {
    type: Object,
    default: null,
  },
  self: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div :class="`hand ${'hand--' + (self ? 'self' : 'opponent')}`">
    <Card
      v-for="card in player.hand"
      :card="card"
      :outlined="self && player.playing && player.mana >= card.cost"
      :side="!self ? 'back' : 'front'"
      state="hand"
      @click="$emit('play', card)"
    />
  </div>
</template>

<style lang="scss" scoped>
.hand {
  @apply fixed flex w-full justify-center z-10;

  &--opponent {
    @apply -top-10;
  }

  &--self {
    @apply -bottom-10;
  }
}
</style>

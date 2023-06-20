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
      :cost="card.cost"
      :outlined="self && player.playing && player.mana >= card.cost"
      :power="card.power"
      :side="!self ? 'back' : 'front'"
      state="hand"
      :title="card.title"
      :toughness="card.toughness"
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

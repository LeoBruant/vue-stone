<script setup>
import Card from "@/components/Card.vue";

const props = defineProps({
  players: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <div class="flex flex-col gap-6 h-screen justify-center items-center">
    <div
      v-for="(player, key) in players"
      :class="`flex flex-1 gap-3 ${key === 'opponent' ? 'items-end' : ''}`"
    >
      <transition v-for="minion in player.minions" name="minion">
        <Card v-show="minion" state="board" :title="minion?.title" />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.minion-enter-active,
.minion-leave-active {
  @apply duration-300 transition-all;
}

.minion-enter-from,
.minion-leave-to {
  @apply opacity-0 z-10;

  transform: perspective(500px) rotate(30deg) translateY(15rem)
    translateZ(15rem);
}
</style>

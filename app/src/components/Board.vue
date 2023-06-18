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
    <div class="flex flex-1 gap-3 items-end">
      <transition
        v-for="minion in players.opponent.minions"
        name="minion-opponent"
      >
        <Card v-show="minion" state="board" :title="minion?.title" />
      </transition>
    </div>
    <div class="flex flex-1 gap-3">
      <transition v-for="minion in players.self.minions" name="minion-self">
        <Card v-show="minion" state="board" :title="minion?.title" />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.minion-opponent-enter-active,
.minion-opponent-leave-active,
.minion-self-enter-active,
.minion-self-leave-active {
  @apply duration-300 transition-all;
}

.minion-opponent-enter-from,
.minion-opponent-leave-to,
.minion-self-enter-from,
.minion-self-leave-to {
  @apply opacity-0 z-10;

  transform: perspective(500px) rotate(var(--rotate))
    translateY(var(--translate-y)) translateZ(15rem);
}

.minion-opponent-enter-from,
.minion-opponent-leave-to {
  --rotate: -30deg;
  --translate-y: -15rem;
}

.minion-self-enter-from,
.minion-self-leave-to {
  --rotate: 30deg;
  --translate-y: 15rem;
}
</style>

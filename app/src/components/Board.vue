<script setup>
import Card from "@/components/Card.vue";
import Health from "@/components/Health.vue";
import Mana from "@/components/Mana.vue";
import PlayerName from "@/components/PlayerName.vue";

import { io } from "socket.io-client";

const socket = io("ws://localhost:8080/");

const props = defineProps({
  game: {
    type: Object,
    default: null,
  },
  players: {
    type: Object,
    default: null,
  },
});

const endTurn = () => {
  if (!props.players.self.playing) {
    return;
  }

  socket.emit("endTurn");
};
</script>

<template>
  <div class="container | bg-orange-200 mx-auto relative">
    <!-- Cards -->
    <div class="flex flex-col gap-1 h-screen justify-center items-center">
      <div class="flex flex-1 gap-3 items-end">
        <transition
          v-for="minion in players.opponent.minions"
          name="minion-opponent"
        >
          <Card
            v-show="minion"
            state="board"
            :power="minion?.power"
            :toughness="minion?.toughness"
          />
        </transition>
      </div>
      <div class="flex flex-1 gap-3 items-start">
        <transition v-for="minion in players.self.minions" name="minion-self">
          <Card
            v-show="minion"
            state="board"
            :power="minion?.power"
            :toughness="minion?.toughness"
          />
        </transition>
      </div>
    </div>

    <!-- UI elements -->
    <div class="ui-elements">
      <div class="name-opponent">
        <PlayerName :name="players.opponent.name" />
      </div>
      <div class="hp-opponent">
        <Health :health="players.self.health"></Health>
      </div>
      <div class="mana-opponent">
        <Mana :max="game.turnMaxMana" :value="players.opponent.mana" />
      </div>
      <div class="hp-self">
        <Health :health="players.opponent.health"></Health>
      </div>
      <div class="name-self">
        <PlayerName :name="players.self.name" />
      </div>
      <div class="mana-self">
        <Mana :max="game.turnMaxMana" :value="players.self.mana" />
      </div>
    </div>

    <!-- End turn button -->
    <button
      class="absolute bg-yellow-300 border-2 border-yellow-700 font-bold p-4 uppercase right-2 rounded top-1/2 transition-colors -traslate-y-1/2 disabled:opacity-50 hover:bg-yellow-300/50 hover:border-yellow-700/50 hover:disabled:bg-opacity-100 hover:disabled:border-opacity-100"
      @click="endTurn"
      :disabled="!players.self.playing"
    >
      end turn
    </button>
  </div>
</template>

<style lang="scss" scoped>
.ui-elements {
  @apply absolute grid inset-0 justify-between items-center px-1 py-12;

  grid-template-areas:
    "name-opponent . mana-opponent"
    ". hp-opponent ."
    ". hp-self ."
    "name-self . mana-self";

  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: max-content auto auto max-content;
}

.name-opponent {
  grid-area: name-opponent;
}

.hp-opponent {
  @apply mt-24 self-start;

  grid-area: hp-opponent;
}

.mana-opponent {
  @apply justify-self-end;

  grid-area: mana-opponent;
}

.name-self {
  grid-area: name-self;
}

.hp-self {
  @apply mb-24 self-end;

  grid-area: hp-self;
}

.mana-self {
  @apply justify-self-end;

  grid-area: mana-self;
}

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

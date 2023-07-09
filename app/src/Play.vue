<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";

import { useUserStore } from "@/stores/user";
import { io } from "socket.io-client";
import { ref } from "vue";
import Dots from "./components/Dots.vue";

const socket = io("ws://localhost:8080/");

const user = useUserStore();

const attacking = ref(null);

const game = ref(null);

const players = ref(null);

const clearGame = () => {
  game.value = null;
  players.value = null;
};

socket.on("endGame", clearGame);
socket.on("disconnect", clearGame);

socket.on("game", (data) => {
  game.value = data;

  const { self, opponent } = data;

  // Define players
  players.value = {
    self,
    opponent,
  };
});

const startAttack = (minion) => {
  if (!players.value.self.playing || minion.turnPlayed >= game.value.turn) {
    return;
  }

  attacking.value = minion;
};

/**
 * @param {number} card Index of the card to play
 */
const play = (card) => {
  socket.emit("play", card);
};

socket.emit("setName", user.name);
</script>

<template>
  <div class="bg-[url('/img/wooden-table.jpeg')] bg-center flex min-h-screen">
    <div
      v-if="!game || !players"
      class="bg-black/50 flex justify-center items-center relative w-full"
    >
      <button
        v-if="!socket.active"
        class="absolute left-2 text-white top-2"
        v-on:click="socket.connect()"
      >
        Reconnect
      </button>
      <div class="flex gap-4 text-5xl text-white">
        <p>Waiting for an opponent</p>
        <Dots />
      </div>
    </div>
    <div v-if="players && game" class="w-full">
      <Hand :player="players.opponent" />
      <Board
        @startAttack="startAttack"
        @stopAttack="attacking = null"
        :attacking="attacking"
        :game="game"
        :players="players"
        :socket="socket"
      />
      <Hand @play="play" :player="players.self" self />
    </div>
  </div>
</template>

<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";

import { io } from "socket.io-client";
import { ref } from "vue";

const socket = io("ws://localhost:8080/");

const attacking = ref(null);

const game = ref(null);

const players = ref(null);

socket.on("game", (data) => {
  game.value = data;
  const { self, opponent } = data;

  // Define players
  players.value = {
    self,
    opponent,
  };
});

function clearGame() {
  console.log("Game cleared");
  game.value = null;
  players.value = null;
}

socket.on("endGame", clearGame);
socket.on("disconnect", clearGame);

const startAttack = (minion) => {
  if (!players.value.self.playing || minion.turnPlayed >= game.value.turn) {
    return;
  }

  attacking.value = minion;
};

const play = (card) => {
  socket.emit("play", {
    card,
    player: JSON.parse(localStorage.getItem("player")),
  });
};
</script>

<template>
  <div v-if="!socket.active">
    Disconnected <button v-on:click="socket.connect()">Reconnect</button>
  </div>
  <div v-if="!game || !players">Waiting for an opponent</div>
  <div v-if="players && game" class="bg-[url('/img/wooden-table.jpeg')]">
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
</template>

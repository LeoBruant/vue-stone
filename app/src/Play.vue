<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";

import { io } from "socket.io-client";
import { ref } from "vue";

const socket = io("ws://localhost:8080/");

const game = ref();

const players = ref();

socket.on("game", (data) => {
  game.value = data;

  // Define players
  players.value = {
    self: data.players.find(
      ({ id }) => id === JSON.parse(localStorage.getItem("player")).id
    ),
    opponent: data.players.find(
      ({ id }) => id !== JSON.parse(localStorage.getItem("player")).id
    ),
  };
});

const play = (card) => {
  socket.emit("play", {
    card,
    player: JSON.parse(localStorage.getItem("player")),
  });
};
</script>

<template>
  <div v-if="players && game" class="bg-amber-900">
    <Hand :player="players.opponent" />
    <Board :game="game" :players="players" />
    <Hand @play="play" :player="players.self" self />
  </div>
</template>

<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";
import Mana from "@/components/Mana.vue";
import Player from "@/components/Player.vue";

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
  <div v-if="players && game" class="contents">
    <Player
      :hp="players.opponent.hp"
      :name="players.opponent.name"
      position="top"
    />
    <Player :hp="players.self.hp" :name="players.self.name" position="bottom" />
    <Hand :cards="players.opponent.hand" player="opponent" />
    <Board :players="players" />
    <Hand
      @play="play"
      :cards="players.self.hand"
      :mana="players.self.mana"
      player="self"
    />
    <Mana
      :max="game.turnMaxMana"
      position="top"
      :value="players.opponent.mana"
    />
    <Mana
      :max="game.turnMaxMana"
      position="bottom"
      :value="players.self.mana"
    />
    <button
      class="bg-yellow-300 border-2 border-yellow-700 fixed font-bold p-4 uppercase right-2 rounded top-1/2 transition-colors -translate-y-1/2 disabled:opacity-50 hover:bg-yellow-300/50 hover:border-yellow-700/50 hover:disabled:bg-opacity-100 hover:disabled:border-opacity-100"
      @click="socket.emit('endTurn')"
      :disabled="!players.self.playing"
    >
      end turn
    </button>
  </div>
</template>

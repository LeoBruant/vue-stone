<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";

import { io } from "socket.io-client";
import { ref } from "vue";
import Dots from "./components/Dots.vue";

const jwt = window.localStorage.getItem("jwt");

const socket = io(import.meta.env.VITE_SOCKET_URL);

const spell = ref(null);

const attacking = ref(null);

const game = ref(null);

const players = ref(null);

const applySpell = ({ minionIndex, spell, spellIndex }) => {
  if (spell.type === "targetOpponentMinion") {
    socket.emit("spellMinion", {
      minionIndex,
      spell,
      spellIndex,
    });
  }
};

const clearGame = () => {
  game.value = null;
  players.value = null;
};

const startAttack = (minion) => {
  if (!players.value.self.playing || minion.turnPlayed >= game.value.turn) {
    return;
  }

  attacking.value = minion;
};

const playSpell = (card) => {
  if (card.spell.type === "targetOpponentMinion") {
    spell.value = card;
  }
};

/**
 * @param {number} card Index of the card to play
 */
const play = (card) => {
  if (players.value.self.hand[card].spell) {
    playSpell(players.value.self.hand[card]);

    return;
  }

  socket.emit("play", card);
};

socket.on("connect", () => {
  if (jwt) {
    socket.emit("setJwt", jwt);
  }
});

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
        @applySpell="applySpell"
        @startAttack="startAttack"
        @stopAttack="attacking = null"
        :attacking="attacking"
        :game="game"
        :players="players"
        :socket="socket"
        :spell="spell"
      />
      <Hand @play="play" :player="players.self" self />
    </div>
  </div>
</template>

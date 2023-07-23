<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";

import { io } from "socket.io-client";
import { ref } from "vue";
import Dots from "./components/Dots.vue";

const jwt = window.localStorage.getItem("jwt");

const currentSpell = ref(null);

const socket = io(import.meta.env.VITE_SOCKET_URL);

const attacking = ref(null);

const game = ref(null);

const players = ref(null);

/**
 * @param {object} spellData All the data needed to apply a spell
 */
const applySpell = (spellData) => {
  socket.emit("applySpell", spellData);
};

const clearGame = () => {
  game.value = null;
  players.value = null;
};

/**
 * @param {number} card Index of the card to play
 */
const play = (card) => {
  if (players.value.self.hand[card].spell) {
    playSpell(players.value.self.hand[card].spell);

    return;
  }

  socket.emit("play", card);
};

/**
 * @param {object} spell Spell property of a card
 */
const playSpell = (spell) => {
  if (
    [
      "drawCards",
      "targetAll",
      "targetAllAllyMinions",
      "targetAllOpponentMinions",
      "targetAllMinions",
      "targetAllyPlayer",
      "targetOpponentPlayer",
      "targetRandomOpponentMinions",
    ].includes(spell[0].type)
  ) {
    socket.emit("playSpell", {
      cardIndex: players.value.self.hand.indexOf(
        players.value.self.hand.find((card) => card?.spell === spell)
      ),
      spell,
    });

    return;
  }

  currentSpell.value = spell;
};

/**
 * @param {object} minion Minion card
 */
const startAttack = (minion) => {
  if (!players.value.self.playing || minion.turnPlayed >= game.value.turn) {
    return;
  }

  attacking.value = minion;
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
        :spell="currentSpell"
      />
      <Hand @play="play" :player="players.self" self />
    </div>
  </div>
</template>

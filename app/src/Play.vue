<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";

import { io } from "socket.io-client";
import { ref } from "vue";
import Dots from "./components/Dots.vue";

const currentSpell = ref(null);
const jwt = window.localStorage.getItem("jwt");

const socket = io(import.meta.env.VITE_SOCKET_URL);

const attackingIndex = ref(null);

const game = ref(null);

const players = ref(null);

/**
 * @param {object} spellData All the data needed to apply a spell
 */
const applySpell = (spellData) => {
  socket.emit("playSpell", spellData);

  attackingIndex.value = null;
  currentSpell.value = null;
};

const clearGame = () => {
  game.value = null;
  players.value = null;
};

const minionAttackPlayer = () => {
  socket.emit("minionAttackPlayer", {
    attackingIndex: attackingIndex.value,
  });

  attackingIndex.value = null;
};

/**
 * @param {number} card Index of the card to play
 */
const playMinion = (card) => {
  if (players.value.self.hand[card].spell) {
    playSpell(players.value.self.hand[card].spell);

    return;
  }

  socket.emit("playMinion", { card });
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
        players.value.self.hand.find((card) => card?.spell === spell),
      ),
      spell,
    });

    attackingIndex.value = null;
    currentSpell.value = null;

    return;
  }

  attackingIndex.value = null;
  currentSpell.value = spell;
};

/**
 * @param {Number} minionIndex Minion card
 */
const startAttack = (minionIndex) => {
  if (
    !players.value.self.playing ||
    players.value.self.minions[minionIndex].turnPlayed >= game.value.turn
  ) {
    return;
  }

  attackingIndex.value = minionIndex;
  currentSpell.value = null;
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
        @endTurn="socket.emit('endTurn')"
        @startAttack="startAttack"
        @minionAttackPlayer="minionAttackPlayer"
        :attackingIndex="attackingIndex"
        :game="game"
        :players="players"
        :spell="currentSpell"
      />
      <Hand @playMinion="playMinion" :player="players.self" self />
    </div>
  </div>
</template>

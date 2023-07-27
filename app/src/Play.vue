<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";

import { io } from "socket.io-client";
import { ref } from "vue";
import Dots from "./components/Dots.vue";

const jwt = window.localStorage.getItem("jwt");

const socket = io(import.meta.env.VITE_SOCKET_URL);

const attackingIndex = ref(null);

const currentSpell = ref(null);

const game = ref(null);

const players = ref(null);

const winner = ref(null);

/**
 * @param {Object} spellData
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
 * @param {Object} indexes
 */
const minionsTrade = (indexes) => {
  socket.emit("minionsTrade", indexes);

  attackingIndex.value = null;
};

/**
 * @param {Number} cardIndex
 */
const playMinion = (cardIndex) => {
  if (players.value.self.hand[cardIndex].spell) {
    playSpell(players.value.self.hand[cardIndex].spell);

    return;
  }

  socket.emit("playMinion", { cardIndex });
};

/**
 * @param {Object} spell Spell property of a card
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

/**
 * @param {String} winner
 */
socket.on("end", ({ winnerName }) => {
  winner.value = winnerName;
});
</script>

<template>
  <div class="bg-[url('/img/wooden-table.jpeg')] bg-center flex min-h-screen">
    <div
      v-if="!game || !players || winner"
      class="bg-black/50 flex justify-center items-center relative w-full"
    >
      <div class="animate-bounce" v-if="winner">
        <p class="text-8xl text-white">Gagnant : {{ winner }}</p>
      </div>
      <div v-else class="flex gap-4 text-5xl text-white">
        <p>Waiting for an opponent</p>
        <Dots />
      </div>
    </div>
    <div v-if="players && game && !winner" class="w-full">
      <Hand :player="players.opponent" />
      <Board
        @applySpell="applySpell"
        @endTurn="socket.emit('endTurn')"
        @startAttack="startAttack"
        @minionAttackPlayer="minionAttackPlayer"
        @minionsTrade="minionsTrade"
        :attackingIndex="attackingIndex"
        :game="game"
        :players="players"
        :spell="currentSpell"
      />
      <Hand @playMinion="playMinion" :player="players.self" self />
    </div>
  </div>
</template>

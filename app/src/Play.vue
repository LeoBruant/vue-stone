<script setup>
import { ref } from "vue";

import { io } from "socket.io-client";

const socket = io("ws://localidhost:8080/");

const game = ref();

const players = ref();

socket.on("connection", () => console.log("connected"));

socket.on("game", (data) => {
  alert();

  // game = data;

  // players.self = game.players.find(
  //   ({ name }) => name === JSON.parse(localStorage.getItem("player")).name
  // );

  // players.opponent = game.players.find(
  //   ({ name }) => name !== JSON.parse(localStorage.getItem("player")).name
  // );

  // console.log(players);
});

const play = (card) => {
  // const index = playerSelf.minions.indexOf(null);
  // if (index === -1) {
  //   return;
  // }
  // playerSelf.minions[index] = card;
  // playerSelf.hand = playerSelf.hand.filter((c) => c !== card);
};
</script>

<template>
  <!-- <div v-if="game.players" class="contents">
    <Player
      :hp="playerOpponent.hp"
      :name="playerOpponent.name"
      position="top"
    />
    <Player :hp="playerSelf.hp" :name="playerSelf.name" position="bottom" />
    <Hand :cards="playerSelf.hand" player="opponent" />
    <Board :players="game.players" />
    <Hand
      @play="play"
      :cards="playerSelf.hand"
      :mana="playerSelf.mana"
      player="self"
    />
    <Mana :max="turnMaxMana" position="top" :value="playerOpponent.mana" />
    <Mana :max="turnMaxMana" position="bottom" :value="playerSelf.mana" />
    <button
      class="bg-yellow-300 border-2 border-yellow-700 font-bold fixed p-4 uppercase right-2 rounded top-1/2 transition-colors -translate-y-1/2 hover:bg-yellow-300/50 hover:border-yellow-700/50"
    >
      end turn
    </button>
  </div> -->
</template>

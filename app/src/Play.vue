<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";
import { reactive } from "vue";
import Mana from "./components/Mana.vue";
import Player from "./components/Player.vue";

const maxMana = 10;

const players = reactive({
  opponent: {
    hand: [{}, {}, {}, {}],
    hp: 30,
    mana: 0,
    minions: [null, null, null, null, null, null, null],
    name: "You",
  },
  self: {
    hand: [
      { cost: 1, title: "Card 1" },
      { cost: 2, title: "Card 2" },
      { cost: 3, title: "Card 3" },
      { cost: 4, title: "Card 4" },
    ],
    hp: 30,
    mana: 1,
    minions: [null, null, null, null, null, null, null],
    name: "Me",
  },
});

const turn = 1;

const turnMaxMana = reactive(turn >= maxMana ? maxMana : turn);

const play = (card) => {
  const index = players.self.minions.indexOf(null);

  if (index === -1) {
    return;
  }

  players.self.minions[index] = card;
  players.self.hand = players.self.hand.filter((c) => c !== card);
};
</script>

<template>
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
  <Mana :max="turnMaxMana" position="top" :value="players.opponent.mana" />
  <Mana :max="turnMaxMana" position="bottom" :value="players.self.mana" />
  <button
    class="bg-yellow-300 border-2 border-yellow-700 font-bold fixed p-4 uppercase right-2 rounded top-1/2 transition-colors -translate-y-1/2 hover:bg-yellow-300/50 hover:border-yellow-700/50"
  >
    end turn
  </button>
</template>

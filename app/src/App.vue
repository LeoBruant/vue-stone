<script setup>
import Board from "@/components/Board.vue";
import Hand from "@/components/Hand.vue";
import { reactive } from "vue";

const players = reactive({
  opponent: {
    hand: [
      { title: "Card 1" },
      { title: "Card 2" },
      { title: "Card 3" },
      { title: "Card 4" }
    ],
    lifepoints: 30,
    mana: 0,
    minions: [null, null, null, null, null, null, null]
  },
  self: {
    hand: [
      { title: "Card 1" },
      { title: "Card 2" },
      { title: "Card 3" },
      { title: "Card 4" }
    ],
    lifepoints: 30,
    mana: 0,
    minions: [null, null, null, null, null, null, null]
  }
});

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
  <Board :players="players" />
  <Hand @play="play" :cards="players.self.hand" />
</template>

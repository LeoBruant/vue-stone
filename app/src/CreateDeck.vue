<script setup>
import { ref, onMounted } from "vue";
import Card from "@/components/Card.vue";
import Layout from "@/Layout.vue";
let ownedCards = ref();
let newDeckCards = ref([]);
const getOwnedCards = async () => {
  const jwt = window.localStorage.getItem("jwt");
  const response = await fetch(`${import.meta.env.VITE_API_URI}/ownedCards`, {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  });
  const cards = await response.json();

  return cards;
};

const createDeck = async (deck) => {
  deck = deck.map(({ cardId }) => cardId);
  const body = JSON.stringify(deck);

  const jwt = window.localStorage.getItem("jwt");
  const response = await fetch(`${import.meta.env.VITE_API_URI}/deck`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body: body,
  });
  const cards = await response.json();

  return cards;
};

const addCardToDeck = (card) => {
  if (newDeckCards.value.length < 30) {
    newDeckCards.value.push(card);
  }
  console.log(newDeckCards);
};

onMounted(async () => {
  ownedCards.value = await getOwnedCards();
  console.log(getOwnedCards());
});
</script>

<template>
  <Layout>
    <div class="gap-7 grid grid-cols-2 justify-center">
      <div class="gap-7 grid grid-cols-[repeat(3,max-content)] justify-center">
        <transition v-for="minion in ownedCards">
          <Card
            @click="addCardToDeck(minion)"
            v-show="!newDeckCards.includes(minion)"
            :card="minion"
            state=""
          />
        </transition>
      </div>
      <div>
        <div @click="createDeck(newDeckCards), (newDeckCards = [])">
          Create Deck
        </div>
        <div
          class="gap-7 grid grid-cols-[repeat(2,max-content)] justify-center auto-rows-max"
        >
          <transition v-for="minion in newDeckCards">
            <Card v-show="minion" :card="minion" state="" />
          </transition>
        </div>
      </div>
    </div>
  </Layout>
</template>

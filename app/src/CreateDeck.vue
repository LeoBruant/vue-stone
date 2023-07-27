<script setup>
import { onMounted, ref } from "vue";
import Card from "@/components/Card.vue";
import Layout from "@/Layout.vue";
import { useToast } from "vue-toastification";
import { getOptions } from "@/getOptions";

const toast = useToast();

let ownedCards = ref();
let newDeckCards = ref([]);

const getOwnedCards = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URI}/ownedCards`,
    getOptions("GET"),
  );
  const cards = await response.json();

  return cards;
};

const createDeck = async (deck) => {
  const body = JSON.stringify(deck.map(({ cardId }) => cardId));

  const response = await fetch(`${import.meta.env.VITE_API_URI}/deck`, {
    ...getOptions("POST"),
    body: body,
  });

  if (!response.ok) {
    toast.error("Deck not created!");
  } else {
    toast.success("Deck created!");
    newDeckCards.value = [];
  }
};

const addCardToDeck = (card) => {
  if (newDeckCards.value.length < 30) {
    newDeckCards.value.push(card);
  }
};

onMounted(async () => {
  ownedCards.value = await getOwnedCards();
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
        <button class="button" @click="createDeck(newDeckCards)">
          Create Deck
        </button>
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

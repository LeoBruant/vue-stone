<script setup>
import Layout from "@/Layout.vue";
import { onMounted, ref } from "vue";
import Card from "@/components/Card.vue";

let decks = ref([]);
let selectedDeck = ref(0);

const getOptions = (method = "GET") => ({
  method: method,
  mode: "cors",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
  },
});

async function refreshDecks() {
  {
    const response = await fetch(
      `${import.meta.env.VITE_API_URI}/deck`,
      getOptions(),
    );
    decks.value = await response.json();
  }
  {
    const response = await fetch(
      `${import.meta.env.VITE_API_URI}/selectedDeck`,
      getOptions(),
    );
    const json = await response.json();
    selectedDeck.value = json.index;
  }
}

onMounted(refreshDecks);

async function handleSelectDeck(deckId) {
  const response = await fetch(`${import.meta.env.VITE_API_URI}/selectedDeck`, {
    ...getOptions("POST"),
    body: JSON.stringify({ deckId }),
  });
  if (response.ok) {
    await refreshDecks();
  } else {
    alert("An error has occurred!");
  }
}

async function handleDeleteDeck(deckId) {
  const response = await fetch(`${import.meta.env.VITE_API_URI}/selectedDeck`, {
    ...getOptions("DELETE"),
    body: JSON.stringify({ deckId }),
  });
  if (response.ok) {
    await refreshDecks();
  } else {
    alert("An error has occurred!");
  }
}
</script>

<template>
  <Layout>
    <div v-for="(deck, i) in decks" class="overflow-x-hidden">
      <h2 class="text-xl font-bold text-center my-6">
        Deck N°{{ i }}
        <span v-if="i === selectedDeck"> (selected) </span>
      </h2>

      <div class="flex gap-6 overflow-x-auto p-6">
        <div v-for="card in deck">
          <Card :card="card" />
        </div>
      </div>

      <div class="flex justify-center gap-6">
        <button
          @click="handleSelectDeck(i)"
          class="active:scale-95 transition-transform p-6 rounded bg-cyan-300 my-6"
        >
          Select deck N°{{ i }}
        </button>

        <button
          @click="handleDeleteDeck(i)"
          class="active:scale-95 transition-transform p-6 rounded bg-red-300 my-6"
        >
          Delete deck N°{{ i }}
        </button>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout.vue";
import { getOptions } from "@/getOptions";
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import Card from "@/components/Card.vue";

const toast = useToast();
const cards = ref([]);
const packs = ref(0);

async function getPacks() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URI}/boosterPack`,
    getOptions("GET"),
  );

  if (response.ok) {
    const json = await response.json();
    packs.value = json.boosterPacksAvailable;
  }
}

onMounted(getPacks);

async function openPack() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URI}/boosterPack`,
    getOptions("POST"),
  );

  if (response.ok) {
    cards.value = await response.json();
    toast.success("Booster pack opened!");
    await getPacks();
  } else {
    toast.error("Booster pack not opened!");
    cards.value = [];
  }
}
</script>

<template>
  <Layout>
    <h2>You have {{ packs }} booster packs</h2>

    <button class="button" @click="openPack">Open a booster pack</button>

    <div v-if="cards.length > 0">
      Cards added:

      <div class="flex gap-6 flex-wrap">
        <div v-for="card in cards">
          <Card :card="card" />
        </div>
      </div>
    </div>
  </Layout>
</template>

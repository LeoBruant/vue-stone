<script setup>
import Layout from "@/Layout.vue";
</script>

<template>
  <Layout>
    <router-link class="button" to="/profile/createDeck">
      Create a deck
    </router-link>

    <router-link class="button" to="/profile/deckSelector">
      Manage your decks
    </router-link>

    <router-link class="button" to="/profile/boosterPack">
      Open your packs
    </router-link>
  </Layout>
</template>

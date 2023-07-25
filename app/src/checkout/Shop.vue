<script setup>
import Layout from "@/Layout.vue";
import { ref } from "vue";

let quantity = ref(1);

async function handleClick() {
  const jwt = window.localStorage.getItem("jwt");

  const body = JSON.stringify({
    quantity: quantity.value,
  });

  console.log(body);

  const response = await fetch(`${import.meta.env.VITE_API_URI}/checkout`, {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    body,
  });

  const { sessionUrl } = await response.json();
  window.location.href = sessionUrl;
}
</script>

<template>
  <Layout>
    <input v-model="quantity" type="number" min="1" max="9" />
    <button @click="handleClick">Buy {{ quantity }} <i>Booster Pack</i></button>
  </Layout>
</template>

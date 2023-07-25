<script setup>
import Layout from "@/Layout.vue";

let quantity = 1;

async function handleClick() {
  const jwt = window.localStorage.getItem("jwt");

  const response = await fetch(`${import.meta.env.VITE_API_URI}/checkout`, {
    method: "POST",
    mode: "cors",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      quantity,
    }),
  });

  const { sessionUrl } = await response.json();
  window.location.href = sessionUrl;
}

console.log(quantity);
</script>

<template>
  <Layout>
    <input
      :value="quantity"
      @input="(event) => (quantity = event.target.value)"
      type="number"
      min="0"
      max="9"
    />
    <button @click="handleClick">Buy {{ quantity }} <i>Booster Pack</i></button>
  </Layout>
</template>

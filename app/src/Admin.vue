<script setup>
import Layout from "@/Layout.vue";
import { getOptions } from "@/getOptions";

let users = ref();

const getUsers = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URI}/user`,
    getOptions("GET"),
  );

  return (users.value = await response.json());
};

const deleteUser = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URI}/user/${user.id}`,
    getOptions("DELETE"),
  );
  await getUsers();
};

import { onMounted, ref } from "vue";

onMounted(getUsers);
</script>

<template>
  <Layout>
    <ul>
      <li v-for="user in users">
        {{ user.name }}
        <button
          @click="deleteUser(user)"
          class="button !bg-red-500 aspect-square"
        >
          ×
        </button>
      </li>
    </ul>
  </Layout>
</template>

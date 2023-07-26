<script setup>
import Layout from "@/Layout.vue";

let name = "";
let email = "";
let password = "";
let jwt = window.localStorage.getItem("jwt");

const signup = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URI}/user`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    if (response.status === 201) {
      alert("Utilisateur créé!");
    } else {
      alert("Utilisateur pas créé! " + response.status);
    }
  } catch (e) {
    console.error(e);
    alert("Erreur");
  }
};

const login = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URI}/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.status === 200) {
      const { token } = await response.json();

      localStorage.setItem("jwt", token);

      alert("Connecté!");
    } else {
      alert("Pas connecté! " + response.status);
    }
  } catch (e) {
    console.error(e);
    alert("Erreur");
  }
};
</script>

<template>
  <Layout>
    <form>
      <input type="text" v-model="name" placeholder="Nom d'utilisateur" />
      <input type="email" v-model="email" placeholder="Adresse email" />
      <input type="password" v-model="password" placeholder="Mot de passe" />

      <button type="button" @click="signup">S'inscrire</button>
      <button type="button" @click="login">Se connecter</button>

      <p>JWT is {{ jwt }}</p>
    </form>
  </Layout>
</template>

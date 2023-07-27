<script setup>
import Layout from "@/Layout.vue";
import { useToast } from "vue-toastification";

const toast = useToast();

let name = "";
let email = "";
let password = "";

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
      toast.success("Utilisateur créé!");
    } else {
      toast.success(`Utilisateur créé! ${response.status}`);
    }
  } catch (e) {
    toast.error(`Erreur : ${e}`);
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

      toast.success("Connecté!");
    } else {
      toast.error(`Pas connecté! : ${response.status}`);
    }
  } catch (e) {
    toast.error(`Erreur : ${e}`);
  }
};
</script>

<template>
  <Layout>
    <form>
      <div class="form-row">
        <label for="name">Nom d'utilisateur</label>
        <input id="name" type="text" v-model="name" />
      </div>
      <div class="form-row">
        <label for="email">Adresse email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="form-row">
        <label for="password">Mot de passe</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div class="form-row | grid-cols-2 mx-auto w-max">
        <button class="button" type="button" @click="signup">S'inscrire</button>
        <button class="button" type="button" @click="login">
          Se connecter
        </button>
      </div>
    </form>
  </Layout>
</template>

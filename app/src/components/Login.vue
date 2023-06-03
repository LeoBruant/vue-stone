<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      jwt: "",
    };
  },
  methods: {
    async signup() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/user`, {
          method: "POST",
          mode: "cors",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
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
    },
    async login() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/login`, {
          method: "POST",
          mode: "cors",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });
        if (response.status === 200) {
          const { token } = await response.json();
          this.jwt = token;
          alert("Connecté!");
        } else {
          alert("Pas connecté! " + response.status);
        }
      } catch (e) {
        console.error(e);
        alert("Erreur");
      }
    },
  },
};
</script>

<template>
  <form>
    <input type="email" v-model="email" placeholder="Adresse email" />
    <input type="password" v-model="password" placeholder="Mot de passe" />

    <button type="button" @click="signup">S'inscrire</button>
    <button type="button" @click="login">Se connecter</button>

    <p>JWT is {{ jwt }}</p>
  </form>
</template>

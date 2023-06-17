<script>
import { io } from "socket.io-client";

const socket = io("ws://localhost:8080/");

export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async submit() {
      if (this.message) {
        console.log(this.message);
        socket.emit("chat message", this.message);
        this.message = "";
      }
    },
  },
};
</script>

<template>
  <form>
    <input type="text" v-model="message" placeholder="Message" />

    <button type="button" @click="submit">Envoyer</button>
  </form>
</template>

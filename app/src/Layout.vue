<template>
  <div class="page-container">
    <header class="header">
      <router-link class="button" to="/">Go to home</router-link>
      <router-link class="button" to="/play">Go to play</router-link>
      <router-link class="button" to="/shop">Go to shop</router-link>
      <router-link class="button" to="/login">Go to login</router-link>
      <router-link class="button" to="/profile/deckSelector">
        Go to deck selector
      </router-link>
    </header>

    <main class="main">
      <slot />
    </main>

    <footer class="footer">© 2023 Copyright VueStone</footer>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  gap: 20px;

  .header,
  .footer {
    padding: 10px;
  }

  .header {
    display: flex;
    gap: 10px;

    .button {
      padding: 15px 10px;
      cursor: pointer;
      border-radius: 5px;
      background-color: aqua;
    }
  }

  .main {
    flex-grow: 1;
  }
}
</style>

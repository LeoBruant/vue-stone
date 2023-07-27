<template>
  <div class="flex flex-col justify-between min-h-screen">
    <header class="flex flex-wrap gap-2.5 p-2.5">
      <router-link class="button" to="/">Home</router-link>
      <router-link class="button" to="/play">Play</router-link>
      <router-link class="button" to="/shop">Shop</router-link>
      <router-link class="button" to="/login">Login</router-link>
      <router-link class="button" to="/profile">Profile</router-link>
    </header>
    <main class="container | mx-auto">
      <slot />
    </main>
    <footer class="px-3.5 py-2.5">© 2023 Copyright VueStone</footer>
  </div>
</template>
<script setup></script>

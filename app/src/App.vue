<script setup>
  import CardSlot from '@/components/CardSlot.vue'
  import Hand from '@/components/Hand.vue'
  import { reactive } from 'vue'

  const slots = reactive([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ])

  let cards = reactive([
    { title: 'Card 1' },
    { title: 'Card 2' },
    { title: 'Card 3' },
    { title: 'Card 4' },
    { title: 'Card 5' },
    { title: 'Card 6' },
    { title: 'Card 7' },
    { title: 'Card 8' },
    { title: 'Card 9' },
    { title: 'Card 10' }
  ])

  const play = (card) => {
    slots[slots.findIndex((slot) => slot === null)] = card

    cards = cards.filter((c) => c !== card)
  }
</script>

<template>
  <div class="flex h-screen w-screen justify-center items-start p-16">
    <div class="gap-2 grid grid-cols-[repeat(5,min-content)]">
      <CardSlot v-for="slot, key in slots" :card="slots[key]"/>
    </div>
  </div>
  <Hand @play="play" :cards="cards"/>
</template>

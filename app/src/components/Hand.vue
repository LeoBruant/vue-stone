<script setup>
  import Card from '@/components/Card.vue'

  const props = defineProps({
    cards: {
      type: Array,
      default: () => []
    }
  })
</script>

<template>
  <div class="bottom-4 fixed flex w-full justify-center z-10 h-">
    <Card
      v-for="card in cards"
      inHand
      size="lg"
      :title="card.title"
      @click="$emit('play', card)"
    />
  </div>
</template>

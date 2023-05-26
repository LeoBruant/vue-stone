<script setup>
  import Card from '@/components/Card.vue'

  const props = defineProps({
    card: {
      type: Object,
      default: null
    }
  })
</script>

<template>
  <div class="
    aspect-[2/3]
    bg-orange-100
    border-8
    border-orange-200
    relative
    rounded
    w-card-xs
    md:w-card-md
    xl:w-card-lg
  ">
    <transition name="card">
      <Card v-show="this.card !== null" onBoard :title="this.card?.title"/>
    </transition>
  </div>
</template>

<style scoped>
  .card-enter-active,
  .card-leave-active {
    @apply duration-300 transition-all;
  }

  .card-enter-from,
  .card-leave-to {
    @apply opacity-0 z-10;

    transform:
      perspective(500px)
      rotate(30deg)
      translateY(15rem)
      translateZ(15rem)
    ;
  }
</style>

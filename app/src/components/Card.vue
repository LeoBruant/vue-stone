<script setup>
  const props = defineProps({
    inHand: {
      type: Boolean,
      default: false
    },
    onBoard: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div
    :class="`
      card
      ${this.inHand ? 'card--in-hand' : ''}
      ${this.onBoard ? 'card--on-board' : ''}
    `"
  >
    <span v-if="this.inHand" v-for="i in 9" class="card__tracker"></span>
    <div class="card__content">
      {{ this.title }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    @apply relative z-10;

    &__tracker {
      @apply absolute inset-0 z-10;

      /* Column 1 */
      &:nth-child(3n - 2) {
        @apply col-start-1 col-end-1;

        &:hover ~ .card__content {
          --rotateY: calc(var(--angle) * -1);
        }
      }

      /* Column 2 */
      &:nth-child(3n - 1) {
        @apply col-start-2 col-end-2;
      }

      /* Column 3 */
      &:nth-child(3n) {
        @apply col-start-3 col-end-3;

        &:hover ~ .card__content {
          --rotateY: var(--angle);
        }
      }

      /* Row 1 */
      &:nth-child(n + 1):nth-child(-n + 3) {
        @apply row-start-1 row-end-1;

        &:hover ~ .card__content {
          --rotateX: var(--angle);
        }
      }

      /* Row 2 */
      &:nth-child(n + 4):nth-child(-n + 6) {
        @apply row-start-2 row-end-2;
      }

      /* Row 3 */
      &:nth-child(n + 7):nth-child(-n + 9) {
        @apply row-start-3 row-end-3;

        &:hover ~ .card__content {
          --rotateX: calc(var(--angle) * -1);
        }
      }
    }

    &__content {
      @apply
        aspect-[2/3]
        bg-orange-200
        border-4
        border-orange-300
        duration-300
        ease-out
        p-1
        rounded
        shadow-xl
        transition-transform
      ;
    }

    &--in-hand {
      @apply
        cursor-pointer
        grid
        grid-cols-3
        grid-rows-3
        -mx-4
        origin-bottom
        transition-transform
        hover:scale-125
        hover:z-20
        xl:-mx-16
      ;

      .card__content {
        --angle: 5deg;
        --perspective: 500px;
        --rotateX: 0;
        --rotateY: 0;

        @apply col-span-full row-span-full w-card-xs sm:w-card-sm md:w-card-md lg:w-card-lg xl:w-card-xl;

        transform:
          perspective(var(--perspective))
          rotateX(var(--rotateX))
          rotateY(var(--rotateY))
        ;
      }
    }

    &--on-board {
      @apply absolute -inset-2;

      .card__content {
        @apply w-card-xs md:w-card-md xl:w-card-lg;
      }
    }
  }
</style>

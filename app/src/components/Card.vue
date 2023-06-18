<script setup>
const props = defineProps({
  outlined: {
    type: Boolean,
    default: false,
  },
  side: {
    type: String,
    default: "front",
  },
  state: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    :class="`
      card
      card--${animationDirection}
      card--${side}
      card--${state}
      ${outlined ? 'card--outline' : ''}
    `"
  >
    <!-- Mouse tracker when card in hand -->
    <span
      v-if="side === 'front' && state === 'hand'"
      v-for="i in 9"
      class="card__tracker"
    >
    </span>
    <!-- Card -->
    <div class="card__content">
      <!-- Front side -->
      <div v-if="side === 'front'">
        {{ title }}
      </div>

      <!-- Back side -->
      <div v-else></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply relative select-none z-10;

  &__content {
    @apply aspect-[2/3] bg-orange-200 border-4 border-orange-300 duration-300 ease-out p-1 rounded shadow transition-all w-32;
  }

  &--hand {
    @apply -mx-0.5;
  }

  &--front {
    .card {
      &__tracker {
        @apply absolute inset-0 z-10;

        // Column 1
        &:nth-child(3n - 2) {
          @apply col-start-1 col-end-1;

          &:hover ~ .card__content {
            --rotateY: calc(var(--angle) * -1);
          }
        }

        // Column 2
        &:nth-child(3n - 1) {
          @apply col-start-2 col-end-2;
        }

        // Column 3
        &:nth-child(3n) {
          @apply col-start-3 col-end-3;

          &:hover ~ .card__content {
            --rotateY: var(--angle);
          }
        }

        // Row 1
        &:nth-child(n + 1):nth-child(-n + 3) {
          @apply row-start-1 row-end-1;

          &:hover ~ .card__content {
            --rotateX: var(--angle);
          }
        }

        // Row 2
        &:nth-child(n + 4):nth-child(-n + 6) {
          @apply row-start-2 row-end-2;
        }

        // Row 3
        &:nth-child(n + 7):nth-child(-n + 9) {
          @apply row-start-3 row-end-3;

          &:hover ~ .card__content {
            --rotateX: calc(var(--angle) * -1);
          }
        }
      }
    }

    &.card--hand {
      @apply cursor-pointer grid grid-cols-3 grid-rows-3 origin-bottom transition-transform hover:scale-[2.5] hover:-translate-y-6 hover:z-20;

      .card__content {
        --angle: 5deg;
        --perspective: 500px;
        --rotateX: 0;
        --rotateY: 0;

        @apply col-span-full row-span-full;

        transform: perspective(var(--perspective)) rotateX(var(--rotateX))
          rotateY(var(--rotateY));
      }

      &:hover {
        .card__content {
          @apply shadow-2xl;
        }
      }
    }
  }

  &--outline {
    .card__content {
      @apply outline outline-4 outline-lime-400;
    }
  }
}
</style>

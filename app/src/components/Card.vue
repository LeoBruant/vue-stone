<script setup>
import { ref } from "vue";

const props = defineProps({
  animation: {
    type: String,
    default: null,
  },
  card: {
    type: Object,
    default: null,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  outlineStyle: {
    type: String,
    default: "play",
  },
  side: {
    type: String,
    default: "front",
  },
  state: {
    type: String,
    default: "",
  },
});

const angle = 10;
const cardElement = ref(null);
const threshold = 5;
const mouseX = ref(0);
const mouseY = ref(0);

const reflect = (e) => {
  if (props.side !== "front" || props.state !== "hand") {
    return;
  }

  const x = e.layerX;
  const y = e.layerY;

  const mouseXValue = mouseX.value;
  const mouseYValue = mouseY.value;

  // Do nothing if mouse too close to previous position
  const xDifference = mouseXValue > x ? mouseXValue - x : x - mouseXValue;
  const yDifference = mouseYValue > y ? mouseYValue - y : y - mouseYValue;

  if (xDifference < threshold && yDifference < threshold) {
    return;
  } else {
    mouseX.value = x;
    mouseY.value = y;
  }

  const height = e.target.clientHeight / 2;
  const width = e.target.clientWidth / 2;

  const basePercentX = x / width;
  const basePercentY = y / height;

  const closeToLeft = x < width;
  const closeToTop = y < height;

  const percentX = closeToLeft ? -(1 - basePercentX) : basePercentX - 1;
  const percentY = closeToTop ? -(1 - basePercentY) : basePercentY - 1;

  cardElement.value.style.setProperty("--mouse-x", `${x}px`);
  cardElement.value.style.setProperty("--mouse-y", `${y}px`);

  cardElement.value.style.setProperty("--rotateX", `${-angle * percentY}deg`);
  cardElement.value.style.setProperty("--rotateY", `${angle * percentX}deg`);
};
</script>

<template>
  <div
    v-if="card"
    @mousemove="reflect"
    :class="`
      card
      card--${side}
      card--${state}
      ${animation ? `card--${animation}` : ''} ${
        outlined ? `card--outline card--outline-${outlineStyle}` : ''
      }
      `"
    ref="cardElement"
  >
    <!-- Border -->
    <div
      :class="`card__border card__border--${card.rarity} ${
        card.rarity !== 'common' ? 'card__border--animated' : ''
      }`"
    ></div>
    <!-- Content -->
    <div class="card__content">
      <!-- Front side -->
      <div v-if="side === 'front'" class="contents">
        <!-- Content -->
        <div class="card__container">
          <div class="card__image-container">
            <div
              class="card__image"
              :style="`background-image: url(/img/cards/${$slug(
                card.title,
              )}.png)`"
            ></div>
          </div>
          <div class="card__title">
            <p class="card__title-content">
              {{ card.title }}
            </p>
          </div>
          <div class="card__description">
            <div v-if="card.ability">
              <div v-for="(property, index) in Object.values(card.ability)">
                <p
                  v-if="property && Object.keys(card.ability)[index] !== '_id'"
                  class="leading-none"
                >
                  <span class="font-bold"
                    >{{ Object.keys(card.ability)[index] }} :</span
                  >
                  {{ property }}
                </p>
              </div>
            </div>
            <div v-if="card.spell">
              <div v-for="effect in card.spell">
                <div v-for="(property, index) in Object.values(effect)">
                  <p
                    v-if="property && Object.keys(effect)[index] !== '_id'"
                    class="leading-none"
                  >
                    <span class="font-bold"
                      >{{ Object.keys(effect)[index] }} :</span
                    >
                    {{ property }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cost -->
        <div class="card__cost">
          {{ card.cost }}
        </div>

        <!-- Power -->
        <div v-if="card.power !== null" class="card__power">
          {{ card.power }}
        </div>

        <!-- Toughness -->
        <div v-if="card.toughness !== null" class="card__toughness">
          {{ card.toughness }}
        </div>
      </div>

      <!-- Back side -->
      <div v-else class="contents"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  @apply duration-300 ease-out relative transition-all z-10;

  &__content {
    @apply aspect-[5/7] bg-orange-200 border-4 border-neutral-700 p-1 pointer-events-none relative rounded-lg select-none shadow-md transition-all w-36 z-10;
  }

  &__cost,
  &__power,
  &__toughness {
    @apply absolute aspect-square border-2 border-neutral-700 flex font-black justify-center h-[21%] items-center pointer-events-none rounded-full shadow-xl text-white text-2xl transition-all z-10;
  }

  &__cost {
    @apply bg-sky-500 left-0 top-0 -translate-x-1/4 -translate-y-1/4;
  }

  &__power {
    @apply bg-yellow-500 bottom-0 left-0 -translate-x-1/4 translate-y-1/4;
  }

  &__toughness {
    @apply bg-red-500 bottom-0 right-0 translate-x-1/4 translate-y-1/4;
  }

  &__container {
    @apply grid grid-rows-2 h-full;
  }

  &__image-container {
    @apply aspect-[10/7] bg-neutral-700/50;
  }

  &__image {
    @apply aspect-square bg-center bg-cover h-full mx-auto;
  }

  &__title {
    @apply absolute flex inset-0 items-center justify-center;
  }

  &__title-content {
    @apply bg-orange-200 font-black leading-none py-[0.25em] shadow-lg text-center text-sm transition-all w-full;
  }

  &__description {
    @apply pt-[18px] text-[9px] transition-all;
  }

  &--attack {
    @apply animate-allyMinionAttack;
  }

  &--back {
    .card__content {
      @apply bg-neutral-500;
    }
  }

  &--board {
    .card {
      &__content {
        @apply p-0;
      }

      &__container {
        @apply block;
      }

      &__cost,
      &__title,
      &__description {
        @apply hidden;
      }

      &__image-container {
        @apply aspect-auto h-full;
      }

      &__image {
        @apply aspect-auto h-full mx-0 rounded;
      }
    }
  }

  &--front {
    .card__border {
      @apply absolute bg-neutral-400 flex -inset-1 overflow-hidden rounded-lg;

      &--animated {
        &::after {
          @apply absolute animate-spin aspect-square -inset-14 m-auto pointer-events-none;

          content: "";
        }
      }

      &--rare::after {
        @apply bg-gradient-to-r from-blue-400 to-emerald-400;
      }

      &--epic::after {
        @apply bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500;
      }

      &--legendary::after {
        @apply bg-gradient-to-r from-lime-600 via-yellow-300 to-red-600;
      }
    }
  }

  &--hand {
    @apply mt-auto;

    & ~ .card {
      @apply -mx-2;
    }

    &.card--front {
      &:hover {
        @apply z-20;

        transform: translateY(-4.5rem) perspective(500px)
          rotateX(var(--rotateX)) rotateY(var(--rotateY));

        .card__border--common {
          @apply bg-neutral-700;
        }

        .card {
          &__content {
            @apply w-[360px];

            &::after {
              @apply absolute inset-0 rounded-[inherit] transition-opacity;

              background: radial-gradient(
                600px circle at var(--mouse-x) var(--mouse-y),
                rgba(255, 255, 255, 0.4),
                transparent 40%
              );
              content: "";
            }
          }

          &__title-content {
            @apply text-3xl;
          }

          &__cost,
          &__power,
          &__toughness {
            @apply border-4 text-6xl;
          }

          &__border {
            @apply -inset-3;

            &::before {
              @apply absolute inset-0 rounded-lg;

              --opacity: 1;

              background: radial-gradient(
                200px circle at var(--mouse-x) var(--mouse-y),
                rgb(255, 255, 255),
                transparent 100%
              );
              content: "";
            }

            &::after {
              @apply -inset-36;
            }
          }

          &__description {
            @apply pt-10 text-2xl;
          }
        }
      }
    }
  }

  &--outline {
    @apply cursor-pointer;

    .card__content {
      @apply outline-offset-4 outline outline-[6px];
    }

    &-attack .card__content {
      @apply outline-orange-400;
    }

    &-play .card__content {
      @apply outline-lime-400;
    }
  }
}
</style>

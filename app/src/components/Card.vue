<script setup>
import { ref } from "vue";

const props = defineProps({
  animation: {
    type: String,
    default: null,
  },
  cost: {
    type: Number,
    default: 0,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  outlineStyle: {
    type: String,
    default: "play",
  },
  power: {
    type: Number,
    default: null,
  },
  rarity: {
    type: String,
    default: "common",
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
  toughness: {
    type: Number,
    default: null,
  },
});

const angle = 5;
const card = ref(null);

const reflect = (e) => {
  if (props.side !== "front" || props.state !== "hand") {
    return;
  }

  const x = e.layerX;
  const y = e.layerY;

  const height = e.target.clientHeight;
  const width = e.target.clientWidth;

  const closeToTop = y < height / 2;
  const closeToLeft = x < width / 2;

  const percentX = x / width;
  const percentY = y / height;

  card.value.style.setProperty("--mouse-x", `${x}px`);
  card.value.style.setProperty("--mouse-y", `${y}px`);

  card.value.style.setProperty(
    "--rotateX",
    `${closeToTop ? angle * (1 - percentY) : -angle * percentY}deg`
  );

  card.value.style.setProperty(
    "--rotateY",
    `${closeToLeft ? -angle * (1 - percentX) : angle * percentX}deg`
  );
};
</script>

<template>
  <div
    @mousemove="reflect"
    :class="`
      card
      card--${side}
      card--${state}
      ${animation ? 'card--' + animation : ''}
      ${outlined ? 'card--outline card--outline-' + outlineStyle : ''}
    `"
    ref="card"
  >
    <div
      v-if="rarity === 'legendary'"
      class="card__border card__border--legendary"
    ></div>
    <div v-else class="card__border card__border--common"></div>
    <div class="card__content">
      <!-- Front side -->
      <div v-if="side === 'front'" class="contents">
        <!-- Content -->
        <div class="card__container">
          <div class="card__image-container">
            <div class="card__image"></div>
          </div>
          <div class="card__title">
            <p class="card__title-content">
              {{ title }}
            </p>
          </div>
          <div class="card__description">
            <p>Lorem, ipsum dolor.</p>
          </div>
        </div>

        <!-- Cost -->
        <div class="card__cost">
          {{ cost }}
        </div>

        <!-- Power -->
        <div v-if="power" class="card__power">
          {{ power }}
        </div>

        <!-- Toughness -->
        <div v-if="toughness" class="card__toughness">
          {{ toughness }}
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
    @apply absolute aspect-square border-2 border-neutral-700 flex font-black justify-center h-10 items-center pointer-events-none rounded-full shadow-xl text-white text-2xl z-10;

    text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;
  }

  &__cost {
    @apply bg-sky-500 left-0 top-0 -translate-x-1/4 -translate-y-1/4;
  }

  &__power {
    @apply bg-amber-400 bottom-0 left-0 -translate-x-1/4 translate-y-1/4;
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
    @apply aspect-square bg-center bg-cover bg-[url('https://loremflickr.com/200/300/cat')] h-full mx-auto;
  }

  &__title {
    @apply absolute flex inset-0 items-center justify-center text-white;
  }

  &__title-content {
    @apply bg-orange-200 font-black shadow-lg text-center w-full;

    text-shadow: 1px 0 0 #000, 0 1px 0 #000, -1px 0 0 #000, 0 -1px 0 #000;
  }

  &__description {
    @apply pt-5 text-xs;
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
        @apply aspect-auto h-full mx-0;
      }
    }
  }

  &--front {
    .card__border {
      @apply absolute -inset-0.5 rounded-lg;

      &--common {
        @apply bg-neutral-700;
      }

      &--legendary {
        @apply flex overflow-hidden;

        &::after {
          @apply absolute animate-spin aspect-square -inset-14 m-auto pointer-events-none;

          background: linear-gradient(
            90deg,
            rgb(255 0 0) 0%,
            rgb(255 165 0) 33%,
            rgb(255 255 0) 66%,
            rgb(238 130 238) 100%
          );
          content: "";
        }
      }
    }
  }

  &--hand {
    @apply -mx-2;

    &.card--front {
      &:hover {
        @apply z-20;

        transform: translateY(-14rem) scale(2.5) perspective(500px)
          rotateX(var(--rotateX)) rotateY(var(--rotateY));

        .card {
          &__content {
            @apply mx-0;

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

          &__border::before {
            @apply absolute inset-0 rounded-lg;

            --opacity: 1;

            background: radial-gradient(
              200px circle at var(--mouse-x) var(--mouse-y),
              rgb(255, 255, 255),
              transparent 100%
            );
            content: "";
          }
        }
      }
    }
  }

  &--outline {
    @apply cursor-pointer;

    .card__content {
      @apply outline-offset-2 outline outline-8;
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

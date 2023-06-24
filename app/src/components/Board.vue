<script setup>
import Card from "@/components/Card.vue";
import Health from "@/components/Health.vue";
import Mana from "@/components/Mana.vue";
import PlayerName from "@/components/PlayerName.vue";
import { ref } from "vue";

const emit = defineEmits(["startAttack", "stopAttack"]);

const props = defineProps({
  attacking: {
    type: Object,
    default: null,
  },
  game: {
    type: Object,
    default: null,
  },
  players: {
    type: Object,
    default: null,
  },
  socket: {
    type: Object,
    default: null,
  },
});

const minionInfo = ref(null);

const minionsAnimation = {};

const attackPlayer = (minion) => {
  if (!props.players.self.playing || !props.attacking) {
    return;
  }

  minionAttack();

  props.socket.emit("damagePlayer", {
    damage: minion.power,
    playerId: props.players.opponent.id,
  });
};

const canAttack = (minion) => {
  return (
    props.players.self.playing &&
    minion?.turnPlayed < props.game.turn &&
    minion.canAttack !== false
  );
};

const endTurn = () => {
  if (!props.players.self.playing) {
    return;
  }

  props.socket.emit("endTurn");
};

const minionAttack = () => {
  const minionIndex = props.players.self.minions.findIndex(
    (m) => m === props.attacking
  );

  props.players.self.minions[minionIndex].canAttack = false;

  minionsAnimation[props.attacking.id] = "attack";

  emit("stopAttack");
};

const startAttack = (minion) => {
  if (!canAttack(minion)) {
    return;
  }

  emit("startAttack", minion);
};
</script>

<template>
  <div
    class="container | bg-orange-200/95 mx-auto relative shadow-2xl shadow-orange-200"
  >
    <!-- Cards -->
    <div class="flex flex-col gap-6 h-screen justify-center items-center">
      <div class="flex flex-1 gap-7 items-end">
        <transition
          v-for="minion in players.opponent.minions"
          name="minion-opponent"
        >
          <Card
            v-show="minion"
            @mouseenter="minionInfo = minion"
            @mouseleave="minionInfo = null"
            :card="minion"
            state="board"
          />
        </transition>
      </div>
      <div class="flex flex-1 gap-7 items-start">
        <transition v-for="minion in players.self.minions" name="minion-self">
          <Card
            v-show="minion"
            @click="startAttack(minion)"
            @mouseenter="minionInfo = minion"
            @mouseleave="minionInfo = null"
            :animation="minionsAnimation[minion?.id]"
            :card="minion"
            state="board"
            :outlined="canAttack(minion)"
            :outlineStyle="attacking === minion ? 'attack' : 'play'"
          />
        </transition>
      </div>
    </div>

    <!-- UI elements -->
    <div class="ui-elements">
      <div class="name-opponent">
        <PlayerName :name="players.opponent.name" />
      </div>
      <div :class="`hp-opponent ${attacking ? 'outlined' : ''}`">
        <Health
          @click="attackPlayer(attacking)"
          :health="players.opponent.health"
        ></Health>
      </div>
      <div class="mana-opponent">
        <Mana :max="game.turnMaxMana" :value="players.opponent.mana" />
      </div>
      <div class="hp-self">
        <Health :health="players.self.health"></Health>
      </div>
      <div class="name-self">
        <PlayerName :name="players.self.name" />
      </div>
      <div class="mana-self">
        <Mana :max="game.turnMaxMana" :value="players.self.mana" />
      </div>
    </div>

    <!-- End turn button -->
    <button
      class="absolute bg-yellow-300 border-2 border-yellow-700 font-black p-4 uppercase right-1 rounded text-xl top-1/2 transition-colors -translate-y-1/2 disabled:opacity-50 hover:bg-yellow-300/50 hover:border-yellow-700/50 hover:disabled:bg-opacity-100 hover:disabled:border-opacity-100"
      @click="endTurn"
      :disabled="!players.self.playing"
    >
      end turn
    </button>

    <!-- Minion infos -->
    <transition name="minion-info">
      <div
        v-if="minionInfo"
        class="absolute left-6 origin-left pointer-events-none scale-[2.5] top-1/2 -translate-y-1/2"
      >
        <Card :card="minionInfo" state="hand" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.ui-elements {
  @apply absolute grid inset-0 justify-between items-center px-1 py-12;

  grid-template-areas:
    "name-opponent . mana-opponent"
    ". hp-opponent ."
    ". hp-self ."
    "name-self . mana-self";

  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: max-content auto auto max-content;
}

.name-opponent {
  grid-area: name-opponent;
}

.hp-opponent {
  @apply mt-20 rounded-full self-start;

  grid-area: hp-opponent;

  &.outlined {
    @apply cursor-pointer outline outline-4 outline-orange-400;
  }
}

.mana-opponent {
  @apply justify-self-end;

  grid-area: mana-opponent;
}

.name-self {
  grid-area: name-self;
}

.hp-self {
  @apply mb-20 self-end;

  grid-area: hp-self;
}

.mana-self {
  @apply justify-self-end;

  grid-area: mana-self;
}

.minion-info-enter-active,
.minion-info-leave-active {
  @apply duration-300 transition-all;
}

.minion-info-enter-from,
.minion-info-leave-to {
  @apply opacity-0 -translate-x-full;
}

.minion-opponent-enter-active,
.minion-opponent-leave-active,
.minion-self-enter-active,
.minion-self-leave-active {
  @apply duration-300 transition-all;
}

.minion-opponent-enter-from,
.minion-opponent-leave-to,
.minion-self-enter-from,
.minion-self-leave-to {
  @apply opacity-0;

  transform: rotate(var(--rotate)) translateY(var(--translate-y))
    translateZ(15rem);
}

.minion-opponent-enter-from,
.minion-opponent-leave-to {
  --rotate: -30deg;
  --translate-y: -15rem;
}

.minion-self-enter-from,
.minion-self-leave-to {
  --rotate: 30deg;
  --translate-y: 15rem;
}
</style>

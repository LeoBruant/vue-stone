import { shuffle } from "./utils.js";

const MAX_HAND = 10;
const MAX_MINIONS = 7;

/**
 * @param {Number} minionPower
 * @param {Number} minionToughness
 * @param {Socket} player
 */
export const addMinionToHand = ({ minionPower, minionToughness, player }) => {
  if (player.hand.length <= MAX_HAND) {
    player.hand.push({
      ability: null,
      attacks: 0,
      cost: 1,
      power: minionPower,
      rarity: "common",
      spell: null,
      title: "Invocation",
      toughness: minionToughness,
    });
  }
};

/**
 * @param {Number} drawnCards
 * @param {Player} player
 */
export const drawCards = ({ drawnCards, player }) => {
  for (let i = 0; i < drawnCards; i++) {
    if (player.hand.length >= MAX_HAND) {
      player.drawPile.pop();
    } else {
      player.hand.push(player.drawPile.pop());
    }
  }
};

/**
 * @param {Socket} player
 * @param {Number} powerAdded
 * @param {Number} toughnessAdded
 */
export const gainForEachAlly = ({ player, powerAdded, toughnessAdded }) => {
  player.minions[player.minions.length - 1].power +=
    powerAdded * player.minions.length - 1;
  player.minions[player.minions.length - 1].toughness +=
    toughnessAdded * player.minions.length - 1;
};

/**
 * @param {Number} minionPower
 * @param {Number} minionToughness
 * @param {Socket} player
 * @param {Number} summonNumber
 */
export const summon = ({
  minionPower,
  minionToughness,
  player,
  summonNumber,
}) => {
  for (let i = 0; i < summonNumber; i++) {
    if (player.minions.length < MAX_MINIONS) {
      player.minions.push({
        ability: null,
        attacks: 0,
        cost: 0,
        power: minionPower,
        rarity: "common",
        spell: null,
        title: "Invocation",
        toughness: minionToughness,
      });
    }
  }
};

/**
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {Number} toughnessAdded
 */
export const targetAll = ({ opponent, player, toughnessAdded }) => {
  targetAllAllies({ player, toughnessAdded });
  targetAllOpponents({ opponent, toughnessAdded });
};

/**
 * @param {Socket} player
 * @param {Number} toughnessAdded
 */
export const targetAllAllies = ({ player, toughnessAdded }) => {
  targetAllAllyMinions({ player, toughnessAdded });
  targetAllyPlayer({ player, toughnessAdded });
};

/**
 * @param {Boolean} destroyMinion
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {Number} powerAdded
 * @param {Number} toughnessAdded
 */
export const targetAllAllyMinions = ({
  destroyMinion,
  player,
  powerAdded,
  toughnessAdded,
}) => {
  for (const minion of player.minions) {
    if (destroyMinion) {
      player.minions = [null, null, null, null, null, null, null];
    } else {
      minion.power += powerAdded ? powerAdded : 0;
      minion.toughness += toughnessAdded ? toughnessAdded : 0;
    }
  }
};

/**
 * @param {Boolean} destroyMinion
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {Number} powerAdded
 * @param {Number} toughnessAdded
 */
export const targetAllMinions = ({
  destroyMinion,
  opponent,
  player,
  powerAdded,
  toughnessAdded,
}) => {
  targetAllAllyMinions({ destroyMinion, player, powerAdded, toughnessAdded });
  targetAllOpponentMinions({
    destroyMinion,
    opponent,
    powerAdded,
    toughnessAdded,
  });
};

/**
 * @param {Boolean} destroyMinion
 * @param {Socket} opponent
 * @param {Number} powerAdded
 * @param {Number} toughnessAdded
 */
export const targetAllOpponentMinions = ({
  destroyMinion,
  opponent,
  powerAdded,
  toughnessAdded,
}) => {
  for (const minion of opponent.minions) {
    if (destroyMinion) {
      opponent.minions = [null, null, null, null, null, null, null];
    } else {
      minion.power += powerAdded ? powerAdded : 0;
      minion.toughness += toughnessAdded ? toughnessAdded : 0;
    }
  }
};

/**
 * @param {Socket} opponent
 * @param {Number} toughnessAdded
 */
export const targetAllOpponents = ({ opponent, toughnessAdded }) => {
  targetAllOpponentMinions({ opponent, toughnessAdded });
  targetOpponentPlayer({ opponent, toughnessAdded });
};

/**
 * @param {Boolean} destroyMinion
 * @param {Number} minionIndex
 * @param {Socket} player
 * @param {Number} powerAdded
 * @param {Number} toughnessAdded
 */
export const targetAllyMinion = ({
  destroyMinion,
  minionIndex,
  player,
  powerAdded,
  toughnessAdded,
}) => {
  if (destroyMinion) {
    player.minions[minionIndex].toughness = 0;

    return;
  }

  player.minions[minionIndex].power += powerAdded ? powerAdded : 0;
  player.minions[minionIndex].toughness += toughnessAdded ? toughnessAdded : 0;
};

/**
 * @param {Socket} player
 * @param {Number} toughnessAdded
 */
export const targetAllyPlayer = ({ player, toughnessAdded }) => {
  player.health += toughnessAdded;
};

/**
 * @param {Number} minionIndex
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {Number} powerAdded
 * @param {string} targetPlayer
 * @param {Number} toughnessAdded
 */
export const targetAny = ({
  minionIndex,
  opponent,
  player,
  powerAdded,
  targetPlayer,
  toughnessAdded,
}) => {
  if (targetPlayer === "opponent") {
    if (minionIndex) {
      targetOpponentMinion({
        minionIndex,
        opponent,
        powerAdded,
        toughnessAdded,
      });
    } else {
      targetOpponentPlayer({ opponent, toughnessAdded });
    }
  } else if (targetPlayer === "self") {
    if (minionIndex) {
      targetAllyMinion({
        minionIndex,
        player,
        powerAdded,
        toughnessAdded,
      });
    } else {
      targetAllyPlayer({ player, toughnessAdded });
    }
  }
};

/**
 * @param {Number} minionIndex
 * @param {Socket} opponent
 * @param {string} targetPlayer
 * @param {Number} toughnessAdded
 */
export const targetOpponent = ({
  minionIndex,
  opponent,
  targetPlayer,
  toughnessAdded,
}) => {
  if (targetPlayer === "opponent") {
    if (minionIndex) {
      targetOpponentMinion({
        minionIndex,
        opponent,
        toughnessAdded,
      });
    } else {
      targetOpponentPlayer({ opponent, toughnessAdded });
    }
  }
};

/**
 * @param {Boolean} destroyMinion
 * @param {Number} minionIndex
 * @param {Socket} opponent
 * @param {Number} powerAdded
 * @param {Number} toughnessAdded
 */
export const targetOpponentMinion = ({
  destroyMinion,
  minionIndex,
  opponent,
  powerAdded,
  toughnessAdded,
}) => {
  if (destroyMinion) {
    opponent.minions[minionIndex].toughness = 0;

    return;
  }

  opponent.minions[minionIndex].power += powerAdded ? powerAdded : 0;
  opponent.minions[minionIndex].toughness += toughnessAdded
    ? toughnessAdded
    : 0;
};

/**
 * @param {Socket} opponent
 * @param {Number} toughnessAdded
 */
export const targetOpponentPlayer = ({ opponent, toughnessAdded }) => {
  opponent.health += toughnessAdded;
};

/**
 * @param {Boolean} destroyMinion
 * @param {Number} minionIndex
 * @param {Socket} opponent
 * @param {Number} powerAdded
 * @param {string} targetPlayer
 * @param {Number} toughnessAdded
 */
export const targetMinion = ({
  destroyMinion,
  minionIndex,
  opponent,
  player,
  powerAdded,
  targetPlayer,
  toughnessAdded,
}) => {
  if (targetPlayer === "opponent") {
    targetOpponentMinion({
      destroyMinion,
      minionIndex,
      opponent,
      powerAdded,
      toughnessAdded,
    });
  } else if (targetPlayer === "self") {
    targetAllyMinion({
      destroyMinion,
      minionIndex,
      player,
      powerAdded,
      toughnessAdded,
    });
  }
};

/**
 * @param {Socket} player
 * @param {Number} toughnessAdded
 */
export const targetRandomAlly = ({ player, toughnessAdded }) => {
  if (Math.round(Math.random())) {
    targetRandomAllyMinion({ player, toughnessAdded });
  } else {
    targetAllyPlayer({ player, toughnessAdded });
  }
};

/**
 * @param {Boolean} destroyMinion
 * @param {Socket} player
 * @param {Number} powerAdded
 * @param {Number} toughnessAdded
 */
export const targetRandomAllyMinion = ({
  destroyMinion,
  player,
  powerAdded,
  toughnessAdded,
}) => {
  const indexes = [];
  const minionsNumber = player.minions.filter((m) => m).length;

  for (let i = 0; i < minionsNumber; i++) {
    indexes.push(i);
  }

  const newIndexes = shuffle(indexes);

  for (const index of newIndexes) {
    if (destroyMinion) {
      player.minions[index].toughness = 0;
    } else {
      player.minions[index].power += powerAdded ? powerAdded : 0;
      player.minions[index].toughness += toughnessAdded ? toughnessAdded : 0;
    }
  }
};

/**
 * @param {Socket} opponent
 * @param {Number} toughnessAdded
 */
export const targetRandomOpponent = ({ opponent, toughnessAdded }) => {
  if (Math.round(Math.random())) {
    targetRandomOpponentMinions({ opponent, toughnessAdded });
  } else {
    targetOpponentPlayer({ opponent, toughnessAdded });
  }
};

/**
 * @param {Boolean} destroyMinion
 * @param {Socket} opponent
 * @param {Number} powerAdded
 * @param {Number} randomMinionsNumber
 * @param {Number} toughnessAdded
 */
export const targetRandomOpponentMinions = ({
  destroyMinion,
  opponent,
  powerAdded,
  randomMinionsNumber,
  toughnessAdded,
}) => {
  const indexes = [];
  const minionsNumber = opponent.minions.filter((m) => m).length;

  for (let i = 0; i < minionsNumber; i++) {
    indexes.push(i);
  }

  const newIndexes = shuffle(indexes).slice(
    0,
    Math.min(randomMinionsNumber, minionsNumber)
  );

  for (const index of newIndexes) {
    if (destroyMinion) {
      opponent.minions[index].toughness = 0;
    } else {
      opponent.minions[index].power += powerAdded ? powerAdded : 0;
      opponent.minions[index].toughness += toughnessAdded ? toughnessAdded : 0;
    }
  }
};

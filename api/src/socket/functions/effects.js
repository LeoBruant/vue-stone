const MAX_HAND = 10;

/**
 * @param {number} drawnCards
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
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {number} toughnessAdded
 */
export const targetAll = ({ opponent, player, toughnessAdded }) => {
  targetAllMinions({ opponent, player, toughnessAdded });
  targetAllyPlayer({ player, toughnessAdded });
  targetOpponentPlayer({ opponent, toughnessAdded });
};

/**
 * @param {boolean} destroyMinion
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {number} powerAdded
 * @param {number} toughnessAdded
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
 * @param {boolean} destroyMinion
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {number} powerAdded
 * @param {number} toughnessAdded
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
 * @param {boolean} destroyMinion
 * @param {Socket} opponent
 * @param {number} powerAdded
 * @param {number} toughnessAdded
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
 * @param {boolean} destroyMinion
 * @param {number} minionIndex
 * @param {Socket} player
 * @param {number} powerAdded
 * @param {number} toughnessAdded
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
 * @param {number} toughnessAdded
 */
export const targetAllyPlayer = ({ player, toughnessAdded }) => {
  player.health += toughnessAdded;
};

/**
 * @param {number} minionIndex
 * @param {Socket} opponent
 * @param {Socket} player
 * @param {number} powerAdded
 * @param {string} targetPlayer
 * @param {number} toughnessAdded
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
 * @param {number} minionIndex
 * @param {Socket} opponent
 * @param {string} targetPlayer
 * @param {number} toughnessAdded
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
 * @param {boolean} destroyMinion
 * @param {number} minionIndex
 * @param {Socket} opponent
 * @param {number} powerAdded
 * @param {number} toughnessAdded
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
 * @param {number} toughnessAdded
 */
export const targetOpponentPlayer = ({ opponent, toughnessAdded }) => {
  opponent.health += toughnessAdded;
};

/**
 * @param {boolean} destroyMinion
 * @param {number} minionIndex
 * @param {Socket} opponent
 * @param {number} powerAdded
 * @param {string} targetPlayer
 * @param {number} toughnessAdded
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
 * @param {boolean} destroyMinion
 * @param {Socket} opponent
 * @param {number} powerAdded
 * @param {number} randomMinionsNumber
 * @param {number} toughnessAdded
 */
export const targetRandomOpponentMinions = ({
  destroyMinion,
  opponent,
  powerAdded,
  randomMinionsNumber,
  toughnessAdded,
}) => {
  const shuffle = (array) => {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  };

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

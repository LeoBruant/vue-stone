/**
 * @typedef Card
 * @property {number} attacks
 * @property {number} cost
 * @property {number} id
 * @property {number} power
 * @property {string} rarity
 * @property {array: {
 *  drawnCards: number | null,
 *  powerAdded: number | null,
 *  randomMinionsNumber : number | null,
 *  toughnessAdded: number | null,
 *  type:
 *    'drawCards' |
 *    'targetAll' |
 *    'targetAllAllyMinions' |
 *    'targetAllMinions' |
 *    'targetAllOpponentMinions' |
 *    'targetAllyMinion' |
 *    'targetAllyPlayer' |
 *    'targetAny' |
 *    'targetOpponent' |
 *    'targetOpponentMinion' |
 *    'targetOpponentPlayer' |
 *    'targetMinion' |
 *    'targetRandomOpponentMinions' |
 * }[]} spell
 * @property {string} title
 * @property {number} toughness
 */

/**
 * @typedef Player
 * @property {Card[]} hand
 * @property {number} health
 * @property {string} id
 * @property {number} mana
 * @property {(Card | null)[]} minions
 * @property {string} name
 * @property {boolean} playing
 */

const DEFAULT_CARD = {
  attacks: 0,
  cost: 0,
  power: 10,
  rarity: "legendary",
  spell: null,
  title: "Minion",
  toughness: 10,
};

/**
 * @type {Player}
 */
const DEFAULT_PLAYER = {
  hand: [
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: 1,
          powerAdded: null,
          toughnessAdded: null,
          type: "drawCards",
        },
      ],
      title: "drawCards",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: 1,
          toughnessAdded: 1,
          type: "targetAll",
        },
      ],
      title: "targetAll",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: 1,
          toughnessAdded: 1,
          type: "targetAllAllyMinions",
        },
      ],
      title: "targetAllAllyMinions",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: 1,
          toughnessAdded: 1,
          type: "targetAllMinions",
        },
      ],
      title: "targetAllMinions",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: -1,
          toughnessAdded: -1,
          type: "targetAllOpponentMinions",
        },
      ],
      title: "targetAllOpponentMinions",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: 1,
          toughnessAdded: 1,
          type: "targetAllyMinion",
        },
      ],
      title: "targetAllyMinion",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: null,
          toughnessAdded: 1,
          type: "targetAllyPlayer",
        },
      ],
      title: "targetAllyPlayer",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: null,
          toughnessAdded: 1,
          type: "targetAny",
        },
      ],
      title: "targetAny",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: null,
          toughnessAdded: -1,
          type: "targetOpponent",
        },
      ],
      title: "targetOpponent",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: -1,
          toughnessAdded: -1,
          type: "targetOpponentMinion",
        },
      ],
      title: "targetOpponentMinion",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: null,
          toughnessAdded: -1,
          type: "targetOpponentPlayer",
        },
      ],
      title: "targetOpponentPlayer",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: 1,
          toughnessAdded: 1,
          type: "targetMinion",
        },
      ],
      title: "targetMinion",
      toughness: null,
    },
    {
      attacks: 0,
      cost: 0,
      power: null,
      randomMinionsNumber: 3,
      rarity: "legendary",
      spell: [
        {
          drawnCards: null,
          powerAdded: -1,
          toughnessAdded: -1,
          type: "targetRandomOpponentMinions",
        },
      ],
      title: "targetRandomOpponentMinions",
      toughness: null,
    },
  ],
  health: 30,
  id: 2,
  mana: 1,
  minions: [
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
  ],
  name: null,
  playing: false,
};

const MAX_MANA = 10;

/**
 * @param {Server} io
 * @param {MatchEmitter} emitter
 */
export default function match(io, emitter) {
  emitter.on(
    "teamReadyEvent",
    /**
     * @param {{team: {jwt: string, socket: Socket}[]}} data
     */
    ({ team }) => {
      console.log("A team is ready to play.");

      startGame(team);
    }
  );
}

/**
 * @param {{jwt: string, socket: Socket, user: User}[]} team
 */
const startGame = async (team) => {
  /**
   * @type {{[id: string]: Player}}
   */
  const players = {};

  let turn = 1;
  let turnMaxMana = 1;

  /**
   * @param {number} amount
   * @param {Player} player
   */
  const drawCards = ({ amount, player }) => {
    for (let i = 0; i < amount; i++) {
      player.hand.push(DEFAULT_CARD);
    }
  };

  /**
   * @param {Player} socket
   */
  const endTurn = (socket) => {
    const player = players[socket.id];

    // Cancel if player is not allowed to play
    if (!player.playing) {
      return;
    }

    if (!Object.values(players).slice(0, -1).includes(player)) {
      turnMaxMana = Math.min(++turn, MAX_MANA);
    }

    for (const key in players) {
      const player = players[key];

      player.playing = !player.playing;
      player.mana = turnMaxMana;

      for (const minion of player.minions) {
        if (minion) {
          minion.attacks = 1;
        }
      }
    }
  };

  /**
   * Find the opponent of a given player
   * @param {Player} player
   * @returns {Player}
   */
  const findOpponent = (player) => {
    if (!player) {
      throw Error("Player is not defined!");
    }

    for (const key in players) {
      if (key !== player.id) {
        return players[key];
      }
    }
  };

  /**
   * @param {Card} minion
   * @param {Number} minionPosition
   * @param {Player} socket
   */
  const minionAttackPlayer = (minion, minionPosition, socket) => {
    const player = players[socket.id];

    // Cancel if player is not allowed to play
    if (!player.playing) {
      return;
    }

    const opponent = findOpponent(player);

    opponent.health -= minion.power;

    player.minions[minionPosition].attacks -= 1;
  };

  /**
   * @param {Socket} socket
   * @param {number} cardIndex
   */
  const play = (socket, cardIndex) => {
    const player = players[socket.id];

    // Do nothing if not player's turn
    if (!player.playing) {
      return;
    }

    /**
     * @type {Card}
     */
    const card = player.hand[cardIndex];

    // Do nothing if not enough mana
    if (player.mana < card.cost) {
      return;
    }

    const emptySlotIndex = player.minions.indexOf(null);

    // Do nothing if no empty slot on the board
    if (emptySlotIndex === -1) {
      return;
    }

    // Remove mana
    player.mana -= card.cost;

    // Put card on board
    player.minions[emptySlotIndex] = {
      ...card,
      turnPlayed: turn,
    };

    // Remove card from hand
    player.hand.splice(cardIndex, 1);
  };

  /**
   * @param {{
   *   cardIndex: number,
   *   minionIndex: number,
   *   minionPlayer: 'opponnent' | 'self',
   *   spell: {
   *     drawnCards: number,
   *     powerAdded: number,
   *     toughnessAdded: number,
   *     type: string
   *   }[]
   * }} data
   * @param {Socket} socket
   */
  const playSpell = (
    { cardIndex, minionIndex, minionPlayer, spell },
    socket
  ) => {
    const player = players[socket.id];

    // Cancel if player is not allowed to play
    if (!player.playing) {
      return;
    }

    /**
     * @type {Card}
     */
    const card = player.hand[cardIndex];

    // Do nothing if not enough mana
    if (player.mana < card.cost) {
      return;
    }

    const opponent = findOpponent(player);

    for (const {
      drawnCards,
      powerAdded,
      toughnessAdded,
      randomMinionsNumber,
      type,
    } of spell) {
      if (type === "drawCards") {
        drawCards({ amount: drawnCards, player });
      } else if (type === "targetAll") {
        targetAll({ opponent, player, toughnessAdded });
      } else if (type === "targetAllAllyMinions") {
        targetAllAllyMinions({ player, powerAdded, toughnessAdded });
      } else if (type === "targetAllMinions") {
        targetAllMinions({ opponent, player, powerAdded, toughnessAdded });
      } else if (type === "targetAllOpponentMinions") {
        targetAllOpponentMinions({
          opponent,
          powerAdded,
          toughnessAdded,
        });
      } else if (type === "targetAllyMinion") {
        targetAllyMinion({ player, powerAdded, toughnessAdded });
      } else if (type === "targetAllyPlayer") {
        targetAllyPlayer({ player, toughnessAdded });
      } else if (type === "targetAny") {
        targetAny({ opponent, player, powerAdded, toughnessAdded });
      } else if (type === "targetOpponent") {
        targetOpponent({ opponent, toughnessAdded });
      } else if (type === "targetOpponentMinion") {
        targetOpponentMinion({ opponent, powerAdded, toughnessAdded });
      } else if (type === "targetOpponentPlayer") {
        targetOpponentPlayer({ opponent, toughnessAdded });
      } else if (type === "targetMinion") {
        targetMinion({ opponent, player, powerAdded, toughnessAdded });
      } else if (type === "targetRandomOpponentMinions") {
        targetRandomOpponentMinions({
          opponent,
          powerAdded,
          randomMinionsNumber,
          toughnessAdded,
        });
      }
    }

    // Remove mana
    player.mana -= card.cost;

    // Remove card from hand
    // player.hand.splice(cardIndex, 1);
  };

  /**
   * @param {Socket} opponent
   * @param {Socket} player
   * @param {number} toughnessAdded
   */
  const targetAll = ({ opponent, player, toughnessAdded }) => {
    targetAllMinions({ opponent, player, toughnessAdded });
    targetAllyPlayer({ player, toughnessAdded });
    targetOpponentPlayer({ opponent, toughnessAdded });
  };

  /**
   * @param {Socket} opponent
   * @param {Socket} player
   * @param {number} powerAdded
   * @param {number} toughnessAdded
   */
  const targetAllAllyMinions = ({ player, powerAdded, toughnessAdded }) => {
    for (const minion of player.minions) {
      if (minion) {
        minion.power += powerAdded ? powerAdded : 0;
        minion.toughness += toughnessAdded ? toughnessAdded : 0;
      }
    }
  };

  /**
   * @param {Socket} opponent
   * @param {Socket} player
   * @param {number} powerAdded
   * @param {number} toughnessAdded
   */
  const targetAllMinions = ({
    opponent,
    player,
    powerAdded,
    toughnessAdded,
  }) => {
    targetAllAllyMinions({ player, powerAdded, toughnessAdded });
    targetAllOpponentMinions({ opponent, powerAdded, toughnessAdded });
  };

  /**
   * @param {Socket} opponent
   * @param {number} powerAdded
   * @param {number} toughnessAdded
   */
  const targetAllOpponentMinions = ({
    opponent,
    powerAdded,
    toughnessAdded,
  }) => {
    for (const minion of opponent.minions) {
      if (minion) {
        minion.power += powerAdded ? powerAdded : 0;
        minion.toughness += toughnessAdded ? toughnessAdded : 0;
      }
    }
  };

  /**
   * @param {Socket} player
   * @param {number} powerAdded
   * @param {number} toughnessAdded
   */
  const targetAllyMinion = ({ player, powerAdded, toughnessAdded }) => {};

  /**
   * @param {Socket} player
   * @param {number} toughnessAdded
   */
  const targetAllyPlayer = ({ player, toughnessAdded }) => {
    player.health += toughnessAdded;
  };

  /**
   * @param {Socket} opponent
   * @param {Socket} player
   * @param {number} powerAdded
   * @param {number} toughnessAdded
   */
  const targetAny = ({ opponent, player, powerAdded, toughnessAdded }) => {};

  /**
   * @param {Socket} opponent
   * @param {number} toughnessAdded
   */
  const targetOpponent = ({ opponent, toughnessAdded }) => {};

  /**
   * @param {Socket} opponent
   * @param {number} powerAdded
   * @param {number} toughnessAdded
   */
  const targetOpponentMinion = ({ opponent, powerAdded, toughnessAdded }) => {};

  /**
   * @param {Socket} opponent
   * @param {number} toughnessAdded
   */
  const targetOpponentPlayer = ({ opponent, toughnessAdded }) => {
    opponent.health += toughnessAdded;
  };

  /**
   * @param {Socket} opponent
   * @param {Socket} player
   * @param {number} powerAdded
   * @param {number} toughnessAdded
   */
  const targetMinion = ({ opponent, player, powerAdded, toughnessAdded }) => {};

  /**
   * @param {Socket} opponent
   * @param {number} powerAdded
   * @param {number} randomMinionsNumber
   * @param {number} toughnessAdded
   */
  const targetRandomOpponentMinions = ({
    opponent,
    powerAdded,
    randomMinionsNumber,
    toughnessAdded,
  }) => {
    const indexes = [];

    const getIndex = () => {
      const newNumber =
        Math.floor(Math.random() * opponent.minions.filter((m) => m).length) +
        1;

      if (indexes.includes(newNumber)) {
        getIndex();
      } else {
        return newNumber;
      }
    };

    for (let i = 0; i < randomMinionsNumber; i++) {
      indexes.push(getIndex());
    }

    for (const index of indexes) {
      opponent.minions[index].power += powerAdded ? powerAdded : 0;
      opponent.minions[index].toughness += toughnessAdded ? toughnessAdded : 0;
    }
  };

  const update = () => {
    for (const { socket } of team) {
      const self = players[socket.id];
      const opponent = findOpponent(self);

      if (!opponent || !self) {
        break;
      }

      socket.emit("game", {
        opponent,
        self,
        turn,
        turnMaxMana,
      });
    }
  };

  let playing = true;

  for (const { socket, user } of team) {
    /**
     * @type {Player}
     */
    const player = structuredClone(DEFAULT_PLAYER);

    player.id = socket.id;
    player.name = user.name;

    // Sets the first player as playing
    player.playing = playing;
    playing = false;

    // Update player
    players[player.id] = player;

    socket.on("endTurn", () => {
      endTurn(socket);
      update();
    });

    socket.on(
      "minionAttackPlayer",
      /**
       * @param {{minion: Card, minionPosition: Number}} obj
       */
      ({ minion, minionPosition }) => {
        minionAttackPlayer(minion, minionPosition, socket);
        update();
      }
    );

    socket.on(
      "play",
      /**
       * @param {number} card Index of the card to play
       */
      (card) => {
        play(socket, card);
        update();
      }
    );

    socket.on("playSpell", (data) => {
      playSpell(data, socket);
      update();
    });

    socket.on("disconnect", () => {
      console.log("One player disconnected, ending game.");

      for (const { socket } of team) {
        socket.emit("endGame");
        socket.disconnect(true);
      }
    });

    update();
  }
};

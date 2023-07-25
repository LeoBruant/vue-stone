import {
  drawCards,
  targetAll,
  targetAllAllyMinions,
  targetAllMinions,
  targetAllOpponentMinions,
  targetAllyMinion,
  targetAllyPlayer,
  targetAny,
  targetMinion,
  targetOpponent,
  targetOpponentMinion,
  targetOpponentPlayer,
  targetRandomOpponentMinions,
} from "./functions/effects.js";

/**
 * @typedef Ability
 * @property {Boolean | null} destroyMinion
 * @property {Number | null} drawnCards
 * @property {Number | null} minionPower
 * @property {Number | null} minionToughness
 * @property {Number | null} powerAdded
 * @property {Number | null} randomMinionsNumber
 * @property {Number | null} summonNumber
 * @property {Boolean} switchStats
 * @property {Number | null} toughnessAdded
 * @property {'appear' | 'death' | null } trigger
 * @property {
 *  'addMinionToHand' |
 *  'discardOpponentCards' |
 *  'drawCards' |
 *  'gainForEachAlly' |
 *  'haste' |
 *  'summon' |
 *  'targetAllAllies' |
 *  'targetAllAllyMinions' |
 *  'targetAllOpponents' |
 *  'targetAllyPlayer' |
 *  'targetOpponentPlayer' |
 *  'targetRandomAlly' |
 *  'targetRandomAllyMinion' |
 *  'targetRandomOpponent' |
 *  'taunt'
 * } type
 */

/**
 * @typedef Card
 * @property {Ability | null} ability
 * @property {Number | null} attacks
 * @property {Number} cost
 * @property {String} description
 * @property {Number} power
 * @property {'common' | 'rare' | 'epic' | 'legendary'} rarity
 * @property {Effect[] | null} spell
 * @property {String} title
 * @property {Number} toughness
 */

/**
 * @typedef Effect
 * @property {Boolean} destroyMinion
 * @property {Number | null} drawnCards
 * @property {Number | null} powerAdded
 * @property {Number | null} randomMinionsNumber
 * @property {Number | null} toughnessAdded
 * @property {
 *   'drawCards' |
 *   'targetAll' |
 *   'targetAllAllyMinions' |
 *   'targetAllMinions' |
 *   'targetAllOpponentMinions' |
 *   'targetAllyMinion' |
 *   'targetAllyPlayer' |
 *   'targetAny' |
 *   'targetOpponent' |
 *   'targetOpponentMinion' |
 *   'targetOpponentPlayer' |
 *   'targetMinion' |
 *   'targetRandomOpponentMinions'
 *  } type
 */

/**
 * @typedef Player
 * @property {Card[]} hand
 * @property {Number} health
 * @property {String} id
 * @property {Number} mana
 * @property {(Card | null)[]} minions
 * @property {String} name
 * @property {Boolean} playing
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
  drawPile: [
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
    { ...DEFAULT_CARD },
  ],
  hand: [
    {
      ability: {
        destroyMinion: null,
        drawnCards: null,
        minionPower: 1,
        minionToughness: null,
        powerAdded: 1,
        randomMinionsNumber: null,
        summonNumber: null,
        switchStats: false,
        toughnessAdded: null,
        trigger: "appear",
        type: "addMinionToHand",
      },
      attacks: 0,
      cost: 0,
      power: 10,
      rarity: "common",
      spell: null,
      title: "addMinionToHand",
      toughness: 10,
    },
    {
      ability: {
        destroyMinion: null,
        drawnCards: 2,
        minionPower: null,
        minionToughness: null,
        powerAdded: null,
        randomMinionsNumber: null,
        summonNumber: null,
        switchStats: false,
        toughnessAdded: null,
        trigger: null,
        type: "drawCards",
      },
      attacks: 0,
      cost: 0,
      power: 10,
      rarity: "common",
      spell: null,
      title: "drawCards",
      toughness: 10,
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
const MAX_MINIONS = 7;

const effectFunctions = {
  drawCards,
  targetAll,
  targetAllAllyMinions,
  targetAllMinions,
  targetAllOpponentMinions,
  targetAllyMinion,
  targetAllyPlayer,
  targetAny,
  targetOpponent,
  targetOpponentMinion,
  targetOpponentPlayer,
  targetMinion,
  targetRandomOpponentMinions,
};

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
   * @param {Player} socket
   */
  const endTurn = (socket) => {
    const player = players[socket.id];
    const opponent = findOpponent(player);

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

    drawCards({ drawnCards: 1, player: opponent });
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
  const minionAttackPlayer = ({ attackingIndex }, socket) => {
    const player = players[socket.id];

    // Cancel if player is not allowed to play
    if (!player.playing) {
      return;
    }

    const opponent = findOpponent(player);

    opponent.health -= player.minions[attackingIndex].power;

    player.minions[attackingIndex].attacks -= 1;
  };

  /**
   * @param {Socket} socket
   * @param {number} cardIndex
   */
  const playMinion = ({ cardIndex }, socket) => {
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
   * @param {number} cardIndex
   * @param {number} minionIndex
   * @param {Spell} spell
   * @param {'opponnent' | 'self'} targetPlayer
   * @param {Socket} socket
   */
  const playSpell = (
    { cardIndex, minionIndex, spell, targetPlayer },
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

    for (const effect of spell) {
      effectFunctions[effect.type]({
        ...effect,
        opponent,
        player,
        minionIndex,
        targetPlayer,
      });
    }

    // Remove mana
    player.mana -= card.cost;

    removeDead();

    // Remove card from hand
    // player.hand.splice(cardIndex, 1);
  };

  const removeDead = () => {
    for (const key in players) {
      const player = players[key];

      for (const minion of player.minions) {
        if (minion?.toughness <= 0) {
          player.minions.splice(player.minions.indexOf(minion), 1);
        }
      }

      const missingMinions = MAX_MINIONS - player.minions.length;

      for (let i = 0; i < missingMinions; i++) {
        player.minions.push(null);
      }
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

    socket.on("minionAttackPlayer", (data) => {
      minionAttackPlayer(data, socket);
      update();
    });

    socket.on("playMinion", (data) => {
      playMinion(data, socket);
      update();
    });

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

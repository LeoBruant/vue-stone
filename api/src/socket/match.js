import tokenLib from "jsonwebtoken";
import { Users } from "../mongodb.js";
import {
  addMinionToHand,
  drawCards,
  gainForEachAlly,
  summon,
  targetAll,
  targetAllAllies,
  targetAllAllyMinions,
  targetAllMinions,
  targetAllOpponentMinions,
  targetAllOpponents,
  targetAllyMinion,
  targetAllyPlayer,
  targetAny,
  targetMinion,
  targetOpponent,
  targetOpponentMinion,
  targetOpponentPlayer,
  targetRandomAlly,
  targetRandomAllyMinion,
  targetRandomOpponent,
  targetRandomOpponentMinions,
} from "./functions/effects.js";
import { shuffle } from "./functions/utils.js";

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

/**
 * @type {Player}
 */
const DEFAULT_PLAYER = {
  drawPile: [],
  hand: [],
  health: 30,
  id: null,
  mana: 1,
  minions: [null, null, null, null, null, null, null],
  name: null,
  playing: false,
};

const MAX_MANA = 10;
const MAX_MINIONS = 7;

const effectFunctions = {
  addMinionToHand,
  drawCards,
  gainForEachAlly,
  summon,
  targetAll,
  targetAllAllies,
  targetAllAllyMinions,
  targetAllMinions,
  targetAllOpponentMinions,
  targetAllOpponents,
  targetAllyMinion,
  targetAllyPlayer,
  targetAny,
  targetOpponent,
  targetOpponentMinion,
  targetOpponentPlayer,
  targetMinion,
  targetRandomAlly,
  targetRandomAllyMinion,
  targetRandomOpponent,
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
    },
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
   * @param {Number} allyMinionIndex
   * @param {Number} opponentMinionIndex
   * @param {Player} socket
   */
  const minionsTrade = ({ allyMinionIndex, opponentMinionIndex }, socket) => {
    const player = players[socket.id];

    // Cancel if player is not allowed to play
    if (!player.playing) {
      return;
    }

    const allyMinion = player.minions[allyMinionIndex];

    // Cancel if minion can't attack
    if (allyMinion.attacks <= 0) {
      return;
    }

    const opponent = findOpponent(player);
    const opponentMinion = opponent.minions[opponentMinionIndex];

    allyMinion.attacks -= 1;

    allyMinion.toughness -= opponentMinion.power;
    opponentMinion.toughness -= allyMinion.power;

    removeDead();
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
    card.turnPlayed = turn;
    player.minions[emptySlotIndex] = card;

    removeDead();

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
    socket,
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
    player.hand.splice(cardIndex, 1);
  };

  const removeDead = () => {
    for (const key in players) {
      let deathTrigger = false;
      const player = players[key];

      for (const minion of player.minions) {
        if (minion?.toughness <= 0) {
          if (minion.ability?.trigger === "death") {
            deathTrigger = true;
            effectFunctions[minion.ability.type]({ ...minion.ability, player });
          }

          player.minions.splice(player.minions.indexOf(minion), 1);
        }
      }

      const missingMinions = MAX_MINIONS - player.minions.length;

      for (let i = 0; i < missingMinions; i++) {
        player.minions.push(null);
      }

      if (deathTrigger) {
        removeDead();
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

  for (const { jwt, socket, user } of team) {
    /**
     * @type {Player}
     */
    const player = structuredClone(DEFAULT_PLAYER);

    if (!user) {
      return;
    }

    player.id = socket.id;
    player.name = user.name;

    const currentUser = await Users.find({ uuid: tokenLib.decode(jwt).uuid });
    const deck = currentUser[0].decks[0];

    // Set deck
    player.drawPile = shuffle(deck);

    // Sets the first player as playing
    player.playing = playing;
    playing = false;

    // Update player
    players[player.id] = player;

    // Draw cards
    drawCards({ drawnCards: 4, player: players[player.id] });

    socket.on("endTurn", () => {
      endTurn(socket);
      update();
    });

    socket.on("minionAttackPlayer", (data) => {
      minionAttackPlayer(data, socket);
      update();
    });

    socket.on("minionsTrade", (data) => {
      minionsTrade(data, socket);
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

import tokenLib from "jsonwebtoken";
import { findOneUser } from "../service/user.js";

/**
 * @typedef Card
 * @property {number} attacks
 * @property {number} cost
 * @property {number} id
 * @property {number} power
 * @property {string} rarity
 * @property {obj: {
 *  drawnCards: number | null,
 *  powerAdded: number | null,
 *  toughnessAdded: number | null,
 *  type: string
 * } | null} spell
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

/**
 * @type {Player}
 */
const DEFAULT_PLAYER = {
  hand: [
    {
      attacks: 0,
      cost: 1,
      id: 1,
      power: 1,
      rarity: "common",
      title: "Card 1",
      toughness: 1,
    },
    {
      attacks: 0,
      cost: 2,
      id: 2,
      power: 2,
      rarity: "rare",
      title: "Card 2",
      toughness: 2,
    },
    {
      attacks: 0,
      cost: 3,
      id: 3,
      power: 3,
      rarity: "epic",
      title: "Card 3",
      toughness: 3,
    },
    {
      attacks: 0,
      cost: 4,
      id: 4,
      power: null,
      rarity: "legendary",
      spell: {
        drawnCards: null,
        powerAdded: 4,
        toughnessAdded: 4,
        type: "targetOpponentMinion",
      },
      title: "Card 4",
      toughness: null,
    },
  ],
  health: 30,
  id: 2,
  mana: 1,
  minions: [null, null, null, null, null, null, null],
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
    },
  );
}

/**
 * @param {{jwt: string, socket: Socket}[]} team
 */
const startGame = async (team) => {
  /**
   * @type {{[id: string]: Player}}
   */
  const players = {};

  let turn = 1;
  let turnMaxMana = 1;

  const spellMinion = (
    { minionIndex, spell: { powerAdded, toughnessAdded, type }, spellIndex },
    socket,
  ) => {
    console.log(
      minionIndex,
      powerAdded,
      toughnessAdded,
      socket,
      spellIndex,
      type,
    );
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

    // If card does not exist, cancel
    // if (!card) {
    //   return;
    // }

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

    update();
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

  for (const { jwt, socket } of team) {
    /**
     * @type {Player}
     */
    const player = structuredClone(DEFAULT_PLAYER);
    const user = await findOneUser(tokenLib.decode(jwt).id);

    player.id = socket.id;
    player.name = user.name;

    // Sets the first player as playing
    player.playing = playing;
    playing = false;

    // Update player
    players[player.id] = player;

    socket.on("spellMinion", (data) => {
      spellMinion(data, socket);
      update();
    });

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
      },
    );

    socket.on(
      "play",
      /**
       * @param {number} card Index of the card to play
       */
      (card) => {
        play(socket, card);
      },
    );

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

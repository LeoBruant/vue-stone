/**
 * @typedef Card
 * @property {number} cost
 * @property {number} id
 * @property {number} power
 * @property {string} rarity
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
      cost: 1,
      id: 1,
      power: 1,
      rarity: "common",
      title: "Card 1",
      toughness: 1,
    },
    {
      cost: 2,
      id: 2,
      power: 2,
      rarity: "common",
      title: "Card 2",
      toughness: 2,
    },
    {
      cost: 3,
      id: 3,
      power: 3,
      rarity: "common",
      title: "Card 3",
      toughness: 3,
    },
    {
      cost: 4,
      id: 4,
      power: 4,
      rarity: "legendary",
      title: "Card 4",
      toughness: 4,
    },
  ],
  health: 30,
  id: 2,
  mana: 1,
  minions: [null, null, null, null, null, null, null],
  name: "Player2",
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
     * @param {{team: Socket[]}} data
     */
    ({ team }) => {
      console.log("A team is ready to play.");
      startGame(team);
    }
  );
}

/**
 * @param {Socket[]} team
 */
function startGame(team) {
  /**
   * @type {{[id: string]: Player}}
   */
  const players = {};
  let turn = 1;
  let turnMaxMana = 1;

  /**
   * Find the opponent of a given player
   * @param {Player} player
   * @returns {Player}
   */
  function findOpponent(player) {
    if (!player) {
      throw Error("Player is not defined!");
    }

    for (const key in players) {
      if (key !== player.id) {
        return players[key];
      }
    }
  }

  /**
   * Finds a player from a socket
   * @param {Socket} socket
   * @returns {Player}
   */
  const findPlayer = (socket) => players[socket.id];

  /**
   * @param {Socket} socket
   * @param {Card} card
   */
  function play(socket, { card }) {
    const self = findPlayer(socket);
    // Cancel if player is not allowed to play
    if (!self.playing) return;

    // Do nothing if not enough mana
    if (self.mana < card.cost) {
      return;
    }

    const emptySlotIndex = self.minions.indexOf(null);

    // Do nothing if no empty slot on the board
    if (emptySlotIndex === -1) {
      return;
    }

    // Remove mana
    self.mana -= card.cost;

    // Put card on board
    self.minions[emptySlotIndex] = {
      ...card,
      turnPlayed: turn,
    };

    // Remove card from hand
    self.hand.splice(self.hand.indexOf(card), 1);

    update();
  }

  function update() {
    for (const socket of team) {
      const self = findPlayer(socket);
      if (!self) break;
      const opponent = findOpponent(self);
      if (!opponent) break;

      socket.emit("game", {
        turn,
        turnMaxMana,
        self,
        opponent,
      });
    }
  }

  let playing = true;

  for (const socket of team) {
    /**
     * @type {Player}
     */
    const player = structuredClone(DEFAULT_PLAYER);
    player.name = player.id = socket.id;
    // Sets the first player as playing
    player.playing = playing;
    playing = !playing;
    players[player.id] = player;

    socket.on("damagePlayer", ({ damage }) => {
      const self = findPlayer(socket);
      // Cancel if player is not allowed to play
      if (!self.playing) return;
      const opponent = findOpponent(self);

      opponent.health = Math.max(opponent.health - damage, 0);

      update();
    });

    socket.on("endTurn", () => {
      turnMaxMana = Math.min(++turn, MAX_MANA);

      for (const key in players) {
        /**
         * @type {Player}
         */
        const player = players[key];
        player.playing = !player.playing;
        player.mana = turnMaxMana;
      }

      update();
    });

    socket.on("play", (data) => {
      play(socket, data);
    });

    socket.on("disconnect", () => {
      console.log("One player disconnected, ending game.");
      for (const socket of team) {
        socket.emit("endGame");
        socket.disconnect(true);
      }
    });

    update();
  }
}

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
  const maxMana = 10;

  /**
   * @type {Player[]}
   */
  const players = [];

  let turn = 1;

  let turnMaxMana = 1;

  /**
   * @param {Player} player
   * @returns {Player}
   */
  function findOpponent(player) {
    if (!player) {
      throw Error("Player is not defined!");
    }

    for (const other of players) {
      if (other.id !== player.id) {
        return other;
      }
    }
  }

  /**
   * @param {Socket} socket
   * @returns {Player}
   */
  function findPlayer(socket) {
    for (const player of players) {
      if (socket.id === player.id) {
        return player;
      }
    }
  }

  /**
   * @param {Socket} socket
   * @param card
   */
  function play(socket, { card }) {
    const self = findPlayer(socket);

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

  for (const socket of team) {
    /**
     * @type {Player}
     */
    const player = structuredClone(DEFAULT_PLAYER);
    player.name = player.id = socket.id;
    players.push(player);

    socket.on("damagePlayer", ({ damage }) => {
      const playerIndex = findOpponent(findPlayer(socket));

      if (players[playerIndex].health - damage >= 0) {
        players[playerIndex].health -= damage;
      } else {
        players[playerIndex].health = 0;
      }

      update();
    });

    socket.on("endTurn", () => {
      turn++;

      if (turn >= maxMana) {
        turnMaxMana = maxMana;
      } else {
        turnMaxMana = turn;
      }

      for (const key in players) {
        const player = players[key];
        player.playing = !player.playing;
        player.mana = turnMaxMana;
      }

      update();
    });

    socket.on("play", (data) => {
      play(socket, data);
      update();
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

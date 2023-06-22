/**
 * @param {Server} io
 * @param {MatchEmitter} emitter
 */
export default function match(io, emitter) {
  const maxMana = 10;

  const players = [
    {
      hand: [
        { cost: 1, id: 1, power: 1, rarity: 'common', title: "Card 1", toughness: 1 },
        { cost: 2, id: 2, power: 2, rarity: 'common', title: "Card 2", toughness: 2 },
        { cost: 3, id: 3, power: 3, rarity: 'common', title: "Card 3", toughness: 3 },
        { cost: 4, id: 4, power: 4, rarity: 'legendary', title: "Card 4", toughness: 4 },
      ],
      health: 30,
      id: 1,
      mana: 1,
      minions: [null, null, null, null, null, null, null],
      name: "Player1",
      playing: true,
    },
    {
      hand: [
        { cost: 1, id: 1, power: 1, rarity: 'common', title: "Card 1", toughness: 1 },
        { cost: 2, id: 2, power: 2, rarity: 'common', title: "Card 2", toughness: 2 },
        { cost: 3, id: 3, power: 3, rarity: 'common', title: "Card 3", toughness: 3 },
        { cost: 4, id: 4, power: 4, rarity: 'legendary', title: "Card 4", toughness: 4 },
      ],
      health: 30,
      id: 2,
      mana: 1,
      minions: [null, null, null, null, null, null, null],
      name: "Player2",
      playing: false,
    },
  ];

  let team = [];

  let turn = 1;

  let turnMaxMana = 1;

  const damagePlayer = ({damage, playerId}) => {
    const playerIndex = players.findIndex((p) => p.id === playerId);

    if (players[playerIndex].health - damage >= 0) {
      players[playerIndex].health -= damage;
    } else {
      players[playerIndex].health = 0;
    }
  }

  const endTurn = () => {
    turn++;

    if (turn >= maxMana) {
      turnMaxMana = maxMana;
    } else {
      turnMaxMana = turn;
    }

    players.forEach((player) => {
      player.playing = !player.playing;
      player.mana = turnMaxMana;
    });
  }

  const play = ({card, player: {id}}) => {
    const playerIndex = players.findIndex((p) => p.id === id);

    // Do nothing if not enough mana
    if (players[playerIndex].mana < card.cost) {
      return;
    }

    const emptySlotIndex = players[playerIndex].minions.indexOf(null);

    // Do nothing if no empty slot on the board
    if (emptySlotIndex === -1) {
      return;
    }

    // Remove mana
    players[playerIndex].mana -= card.cost;

    // Put card on board
    players[playerIndex].minions[emptySlotIndex] = {...card, turnPlayed: turn};

    // Remove card from hand
    players[playerIndex].hand = players[playerIndex].hand.filter(({id}) => id !== card.id);
  }

  const initialize = () => {
    for (const member of team) {
      member.on("damagePlayer", (data) => {
        damagePlayer(data);
        update();
      });

      member.on("endTurn", () => {
        endTurn();
        update();
      });

      member.on("play", (data) => {
        play(data);
        update();
      });
    }
  }

  const update = () => {
    for (const member of team) {
      member.emit("game", {
        turn,
        turnMaxMana,
        players,
      });
    }
  }

  emitter.on(
    "teamReadyEvent",
    /**
     * @param {{team: Socket[]}} data
     */
    (data) => {
      team = data.team;
      initialize();
      update();
    }
  );
}

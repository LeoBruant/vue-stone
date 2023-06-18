/**
 * @param {Server} io
 * @param {MatchEmitter} emitter
 */
export default function match(io, emitter) {
  const maxMana = 10;

  const players = [
    {
      hand: [
        { cost: 1, id: 1, title: "Card 1" },
        { cost: 2, id: 2, title: "Card 2" },
        { cost: 3, id: 3, title: "Card 3" },
        { cost: 4, id: 4, title: "Card 4" },
      ],
      hp: 30,
      id: 1,
      mana: 1,
      minions: [null, null, null, null, null, null, null],
      name: "Player1",
      playing: true,
    },
    {
      hand: [
        { cost: 1, id: 1, title: "Card 1" },
        { cost: 2, id: 2, title: "Card 2" },
        { cost: 3, id: 3, title: "Card 3" },
        { cost: 4, id: 4, title: "Card 4" },
      ],
      hp: 30,
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
    players[playerIndex].minions[emptySlotIndex] = card;

    // Remove card from hand
    players[playerIndex].hand = players[playerIndex].hand.filter(({id}) => id !== card.id);
  }

  const initialize = () => {
    for (const member of team) {
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

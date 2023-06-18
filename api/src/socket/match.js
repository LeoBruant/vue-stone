/**
 * @param {Server} io
 * @param {MatchEmitter} emitter
 */
export default function match(io, emitter) {
  const maxMana = 10;

  let turn = 1;

  let turnMaxMana = 1;

  const players = [
    {
      hand: [
        { cost: 1, title: "Card 1" },
        { cost: 2, title: "Card 2" },
        { cost: 3, title: "Card 3" },
        { cost: 4, title: "Card 4" },
      ],
      hp: 30,
      mana: 0,
      minions: [null, null, null, null, null, null, null],
      name: "Player1",
    },
    {
      hand: [
        { cost: 1, title: "Card 1" },
        { cost: 2, title: "Card 2" },
        { cost: 3, title: "Card 3" },
        { cost: 4, title: "Card 4" },
      ],
      hp: 30,
      mana: 1,
      minions: [null, null, null, null, null, null, null],
      name: "Player2",
    },
  ]

  emitter.on(
    "teamReadyEvent",
    /**
     * @param {Socket[]} team
     */
    ({ team }) => {
      for (const member of team) {
        console.log(member.id);
        member.emit("game", {
          turn,
          turnMaxMana,
          players
        });
      }
    }
  );
}

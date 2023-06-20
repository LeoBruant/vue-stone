/**
 * @param {Server} io
 * @param {MatchEmitter} emitter
 */
export default function match(io, emitter) {
  emitter.on(
    "teamReadyEvent",
    /**
     * @param {Socket[]} team
     */
    ({ team }) => {
      console.log("A new team is ready to play!");

      for (const member of team) {
        member.on("chat message", (msg) => {
          console.log(`Player ${member.id} sent a message: ${msg}`);
        });
      }
    }
  );
}

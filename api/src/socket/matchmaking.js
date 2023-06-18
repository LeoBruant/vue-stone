/**
 * @param {Server} io
 * @param {MatchEmitter} emitter
 */
export default function matchmaking(io, emitter) {
  /**
   * @type {Set<Socket>}
   */
  const waiting = new Set();

  io.on(
    "connection",
    /**
     * @param {Socket} socket
     */
    (socket) => {
      waiting.add(socket);
      console.log(
        `A new player has joined, ${waiting.size} players in waiting room.`
      );

      if (waiting.size >= 2) {
        const team = Array.from(waiting).slice(0, 2);
        emitter.emit("teamReadyEvent", { team });
        for (const member of team) {
          waiting.delete(member);
        }
      }

      socket.on("disconnect", () => {
        console.log(
          `A new player has left, ${waiting.size} players in waiting room.`
        );
        waiting.delete(socket);
      });
    }
  );
}

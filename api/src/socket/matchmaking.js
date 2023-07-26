import { findOneUser } from "../service/user.js";
import tokenLib from "jsonwebtoken";

/**
 * @param {Server} io
 * @param {MatchEmitter} emitter
 */
export default function matchmaking(io, emitter) {
  /**
   * @type {Set<{jwt: string, socket: Socket}>}
   */
  const waiting = new Set();

  io.on(
    "connection",
    /**
     * @param {Socket} socket
     */
    (socket) => {
      socket.on(
        "setJwt",
        /**
         * @param {string} jwt
         */
        async (jwt) => {
          const decodedJwt = tokenLib.decode(jwt);
          try {
            const user = await findOneUser(decodedJwt.id);

            waiting.add({ jwt, socket, user });

            console.log(
              `A new player has joined, ${waiting.size} players in waiting room.`,
            );

            if (waiting.size >= 2) {
              const team = Array.from(waiting).slice(0, 2);

              emitter.emit("teamReadyEvent", { team });

              for (const member of team) {
                waiting.delete(member);
              }
            }
          } catch (e) {
            console.warn(
              `User ${decodedJwt.id} connected but it is not registered in the database.`,
            );
          }
        },
      );

      socket.on("disconnect", () => {
        console.log(
          `A new player has left, ${waiting.size} players in waiting room.`,
        );
        waiting.delete(socket);
      });
    },
  );
}

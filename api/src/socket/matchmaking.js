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
      console.log(
        `A new player has joined, waiting for their authorization token.`,
      );

      socket.on(
        "setJwt",
        /**
         * @param {string} jwt
         */
        async (jwt) => {
          const decodedJwt = tokenLib.decode(jwt);

          try {
            if (!jwt) {
              throw Error("JWT is not defined");
            }

            console.log(`User ${decodedJwt?.uuid} is connected`);
            const user = await findOneUser(decodedJwt.uuid);

            if (user === null) {
              throw Error("User is not found");
            }

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
              `User ${decodedJwt?.uuid} connected but it is not registered in the database.`,
            );
          }
        },
      );

      socket.on("disconnect", () => {
        console.log(
          `A new player has left, ${waiting.size} players in waiting room.`,
        );
        for (const element of waiting) {
          if (element.socket === socket) {
            waiting.delete(element);
          }
        }
      });
    },
  );
}

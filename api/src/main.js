import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import { EventEmitter } from "node:events";
import { Server } from "socket.io";
import authenticationController from "./controller/authentication.js";
import boosterPackController from "./controller/boosterPackController.js";
import cardController from "./controller/cardController.js";
import checkoutController from "./controller/checkoutController.js";
import deckController from "./controller/deck.js";
import userController from "./controller/user.js";
import db from "./model.mjs";
import { disconnectMongoDb, initMongoDb } from "./mongodb.js";
import match from "./socket/match.js";
import matchmaking from "./socket/matchmaking.js";

config();

export const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

await db.connection.sync({ force: true });
const mongod = await initMongoDb();

const port = process.env.PORT ?? 8080;
app.use(cors());

app.use(express.static("static"));

app.get("/api/health", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userController);
app.use("/api", authenticationController);
app.use("/api", cardController);
app.use("/api", deckController);
app.use("/api", checkoutController);
app.use("/api", boosterPackController);

class MatchEmitter extends EventEmitter {}
const emitter = new MatchEmitter();

matchmaking(io, emitter);
match(io, emitter);

if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => {
    console.log(`listening on *:${port}`);
  });
}

server.on("close", async () => {
  await disconnectMongoDb(mongod);
});

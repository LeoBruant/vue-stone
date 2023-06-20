import cors from "cors";
import { config } from "dotenv";
import express from "express";
import cardController from "./controller/cardController.js";
import db from "./model.mjs";
import authenticationController from "./controller/authentication.js";
import userController from "./controller/user.js";
import { Server } from "socket.io";
import { createServer } from "http";
import matchmaking from "./socket/matchmaking.js";
import { EventEmitter } from "node:events";
import match from "./socket/match.js";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

config();
await db.connection.sync({ force: true });

const port = process.env.PORT ?? 8080;
app.use(cors());
app.use(express.json())


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

await db.Card.create({ title: "abc", cost: 2, power: 5, toughness: 7, img: "a", ability: "provocation"});
await db.Card.create({ title: "def", cost: 4, power: 2, toughness: 4, img: "a", ability: "rale"});

app.use(userController);
app.use(authenticationController);

class MatchEmitter extends EventEmitter {}
const emitter = new MatchEmitter();

matchmaking(io, emitter);
match(io, emitter);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.use(cardController);



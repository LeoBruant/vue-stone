import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import { EventEmitter } from "node:events";
import { Server } from "socket.io";
import authenticationController from "./controller/authentication.js";
import userController from "./controller/user.js";
import db from "./model.mjs";
import match from "./socket/match.js";
import matchmaking from "./socket/matchmaking.js";

export const app = express();
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
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userController);
app.use(authenticationController);

class MatchEmitter extends EventEmitter {}
const emitter = new MatchEmitter();

matchmaking(io, emitter);
match(io, emitter);

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

import { config } from "dotenv";
import express from "express";
import cors from "cors";
import userController from "./controller/user.js";
import authenticationController from "./controller/authentication.js";
import db from "./model.mjs";
import { Server } from "socket.io";
import { createServer } from "http";

const server = createServer(app);
const io = new Server(server);

config();
export const app = express();
await db.connection.sync({ force: true });

const port = process.env.PORT ?? 8080;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

app.use(userController);
app.use(authenticationController);

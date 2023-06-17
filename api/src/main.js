import { config } from "dotenv";
import express from "express";
import cors from "cors";
import userController from "./controller/user.js";
import authenticationController from "./controller/authentication.js";
import db from "./model.mjs";
import { Server } from "socket.io";
import { createServer } from "http";

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
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userController);
app.use(authenticationController);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.send("welcome");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

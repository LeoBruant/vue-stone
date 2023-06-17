import cors from "cors";
import { config } from "dotenv";
import express from "express";
import authenticationController from "./controller/authentication.js";
import userController from "./controller/user.js";
import db from "./model.mjs";

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

app.use(userController);
app.use(authenticationController);

import { config } from "dotenv";
import express from "express";
import cors from "cors";
import cardController from "./controller/cardController.js";
import db from "./model.mjs";


config();
const app = express();
await db.connection.sync({ force: true });

const port = process.env.PORT ?? 8080;
app.use(cors());
app.use(express.json())

await db.Card.create({ title: "abc", cost: 2 });
await db.Card.create({ title: "def", cost: 4 });



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(cardController);



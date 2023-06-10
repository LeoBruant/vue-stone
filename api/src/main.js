import { config } from "dotenv";
import express from "express";
import cors from "cors";
// import {Sequelize} from "sequelize";
// import Card from "./model/card.js";
import db from "./model.mjs";


config();
const app = express();
await db.connection.sync({ force: true });

const port = process.env.PORT ?? 8080;
app.use(cors());

// const sequelize = new Sequelize('postgres://user:password@localhost:5432/db')

await db.Card.create({ title: "titre test" , cost: 2});



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



import { config } from "dotenv";
import express from "express";
import cors from "cors";

config();
const app = express();
const port = process.env.PORT ?? 8080;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

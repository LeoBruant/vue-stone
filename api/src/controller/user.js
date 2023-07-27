import express, { Router } from "express";
import { ValidationError } from "sequelize";
import { createUser } from "../service/user.js";
import { Users } from "../mongodb.js";

const router = Router();

router.get("/user", express.json(), async (req, res) => {
  const user = await Users.find({});
  res.send(user);
});

router.post("/user", express.json(), async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    res.sendStatus(400);
    return;
  }

  try {
    const user = await createUser(name, email, password);
    res.status(201);
    res.send(user);
  } catch (e) {
    if (e instanceof ValidationError) {
      console.warn(e);
      res.sendStatus(400);
    } else {
      console.error(e);
      res.sendStatus(500);
    }
  }
});

export default router;

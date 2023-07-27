import express, { Router } from "express";
import { ValidationError } from "sequelize";
import { createUser } from "../service/user.js";
import db from "../../../api/src/model.mjs";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.get("/user", express.json(), authenticate, async (req, res) => {
  console.log(req.user);
  if (req.user.isAdmin) {
    const user = await db.User.findAll();
    res.send(user);
  } else {
    res.sendStatus(401);
  }
});

router.delete("/user/:id", express.json(), authenticate, async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  if (req.user.isAdmin) {
    const user = await db.User.findOne({ where: { id } });
    user.destroy();
    res.send(user);
  } else {
    res.sendStatus(401);
  }
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

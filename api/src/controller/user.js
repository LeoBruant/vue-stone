import express, { Router } from "express";
import { ValidationError } from "sequelize";
import { createUser } from "../service/user.js";
import db from "../../../api/src/model.mjs";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.get("/user", express.json(), authenticate, async (req, res) => {
  const user = await db.User.findOne({ where: { uuid: req.user.uuid } });

  if (!user || !user.isAdmin) {
    return res.sendStatus(403);
  }

  const users = await db.User.findAll();
  res.send(users);
});

router.delete("/user/:id", express.json(), authenticate, async (req, res) => {
  const user = await db.User.findOne({ where: { uuid: req.user.uuid } });

  if (!user || !user.isAdmin) {
    return res.sendStatus(403);
  }

  const { id } = req.params;
  const userToDelete = await db.User.findOne({ where: { id } });
  await userToDelete.destroy();
  res.sendStatus(204);
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

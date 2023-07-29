import express, { Router } from "express";
import { ValidationError } from "sequelize";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUserByEmail,
  isUserAdmin,
} from "../service/user.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.get("/user", express.json(), authenticate, async (req, res) => {
  if (!isUserAdmin(req.user.uuid)) {
    return res.sendStatus(403);
  }

  res.send(await findAllUsers());
});

router.delete("/user/:id", express.json(), authenticate, async (req, res) => {
  if (!isUserAdmin(req.user.uuid)) {
    return res.sendStatus(403);
  }

  if (await deleteUser(parseInt(req.params.id))) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

router.post("/user", express.json(), async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.sendStatus(400);
  }

  try {
    if ((await findOneUserByEmail(email)) === undefined) {
      return res.sendStatus(406);
    }

    const user = await createUser(name, email, password);
    res.status(201);
    res.send({ name: user.name, email: user.email, uuid: user.uuid });
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

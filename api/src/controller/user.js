import { createUser } from "../service/user.js";
import { Router } from "express";
import { ValidationError } from "sequelize";

const router = Router();

router.post("/user", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await createUser(email, password);
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

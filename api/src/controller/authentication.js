import express, { Router } from "express";
import { findAllUsers } from "../service/user.js";

const router = Router();

router.post("/login", express.json(), async (req, res) => {
  const { email, password } = req.body;

  const [user] = await findAllUsers({ email });

  if (!user?.checkPassword(password)) {
    return res.sendStatus(401);
  }

  res.json({ token: user.generateToken() });
});

export default router;

import express, { Router } from "express";
import { findOneUserByEmail } from "../service/userService.js";

const router = Router();

router.post("/login", express.json(), async (req, res) => {
  const { email, password } = req.body;

  const user = await findOneUserByEmail(email);

  if (!user?.checkPassword(password)) {
    return res.sendStatus(401);
  }

  res.json({ token: user.generateToken() });
});

export default router;

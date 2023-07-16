import { Router } from "express";
import { findAllUsers } from "../service/user.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [user] = await findAllUsers({ email });

  if (!user || !user.checkPassword(password)) {
    return res.sendStatus(401);
  }

  res.json({ token: user.generateToken() });
});

export default router;

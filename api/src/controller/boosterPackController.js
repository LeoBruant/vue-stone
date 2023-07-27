import { Router } from "express";
import authenticate from "../middleware/authenticate.js";
import db from "../model.mjs";
import { getRandomCards } from "../service/cardService.js";
import { addOwnedCards } from "../service/checkoutService.js";

const router = new Router();

router.get("/boosterPack", authenticate, async (req, res) => {
  const user = await db.User.findOne({
    where: { uuid: req.user.uuid },
  });

  if (!user) {
    res.status(400);
    res.send("User not found");
    return;
  }

  res.send({ boosterPacksAvailable: user.boosterPacksAvailable });
});

router.post("/boosterPack", authenticate, async (req, res) => {
  const user = await db.User.findOne({
    where: { uuid: req.user.uuid },
  });

  if (!user) {
    res.status(400);
    res.send("User not found");
    return;
  }

  if (user.boosterPacksAvailable === 0) {
    res.status(400);
    res.send("No more packs to open");
    return;
  }

  const cards = await getRandomCards();
  try {
    await addOwnedCards(user.uuid, cards);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send(e);
  }

  await user.update({
    boosterPacksAvailable: Math.max(0, user.boosterPacksAvailable - 1),
  });

  res.send(cards);
});

export default router;

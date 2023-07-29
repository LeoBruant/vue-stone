import authenticate from "../middleware/authenticate.js";
import { Users } from "../mongodb.js";
import { createDeck } from "../service/deck.js";
import express, { Router } from "express";

const router = new Router();

router.get("/deck", authenticate, express.json(), async (req, res) => {
  try {
    const user = await Users.findOne({ uuid: req.user.uuid });
    res.send(user.decks);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.post("/selectedDeck", authenticate, express.json(), async (req, res) => {
  const user = await Users.findOne({ uuid: req.user.uuid });
  user.deckToUse = req.body.deckId;
  await user.save();
  res.send();
});

router.delete(
  "/selectedDeck",
  authenticate,
  express.json(),
  async (req, res) => {
    const user = await Users.findOne({ uuid: req.user.uuid });
    if (!user) {
      return res.sendStatus(400);
    }
    if (user.decks.length <= 1) {
      return res.sendStatus(400);
    }
    user.decks.splice(req.body.deckId, 1);
    user.deckToUse = Math.min(Math.max(0, user.deckToUse), user.decks.length);
    await user.save();
    res.send();
  },
);

router.get("/selectedDeck", authenticate, express.json(), async (req, res) => {
  const user = await Users.findOne({ uuid: req.user.uuid });
  res.send({ index: user.deckToUse, deck: user.decks[user.deckToUse] });
});

router.get("/ownedCards", authenticate, express.json(), async (req, res) => {
  const user = await Users.findOne({ uuid: req.user.uuid });
  res.send(user.ownedCards);
});

router.post("/deck", authenticate, express.json(), async (req, res) => {
  if (
    !req.body ||
    !Array.isArray(req.body) ||
    req.body.length > 30 ||
    req.body.length <= 0
  ) {
    return res.sendStatus(400);
  }

  try {
    const deck = await createDeck(req.user.uuid, req.body);
    if (!deck) {
      return res.sendStatus(400);
    } else {
      res.status(201);
      res.send(deck);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default router;

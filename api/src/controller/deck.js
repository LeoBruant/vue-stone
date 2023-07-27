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
      res.status(400);
      return res.send("User not found");
    }
    if (user.decks.length <= 1) {
      res.status(400);
      return res.send("Cannot delete your last deck");
    }
    if (user.deckToUse === req.body.deckId) {
      user.deckToUse = Math.min(
        Math.max(0, user.deckToUse - 1),
        user.decks.length,
      );
    }
    user.decks.splice(req.body.deckId, 1);
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
    res.status(400);
    return res.send("Invalid body");
  }

  try {
    const deck = await createDeck(req.user.uuid, req.body);
    if (!deck) {
      res.status(400);
      res.send("Deck not created");
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

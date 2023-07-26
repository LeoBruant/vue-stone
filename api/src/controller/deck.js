import router from "./cardController.js";
import authenticate from "../middleware/authenticate.js";
import { Users } from "../mongodb.js";
import { createDeck } from "../service/deck.js";

router.get("/deck", authenticate, async (req, res) => {
  const user = await Users.findOne({ uuid: req.user.uuid });
  res.send(user.decks);
});

router.get("/ownedCards", authenticate, async (req, res) => {
  const user = await Users.findOne({ uuid: req.user.uuid });
  res.send(user.ownedCards);
});

router.post("/deck", authenticate, async (req, res) => {
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
      res.sendStatus(400);
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

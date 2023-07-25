import { Router } from "express";
import stripe from "../stripe.js";
import authenticate from "../middleware/authenticate.js";

const router = new Router();

const YOUR_DOMAIN = "http://localhost:3000";
const PRICE_ID = "price_1NXh1MBaDFkq1eT7WgjcvIkN";

router.post("/checkout", authenticate, async (req, res) => {
  const { quantity } = req.body;

  if (0 >= quantity && quantity >= 10) {
    res.sendStatus(400);
    return;
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: PRICE_ID,
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/#/checkout/success`,
    cancel_url: `${YOUR_DOMAIN}/#/checkout/cancelled`,
  });

  res.send({
    sessionUrl: session.url,
  });
});

export default router;

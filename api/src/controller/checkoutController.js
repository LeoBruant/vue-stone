import express, { Router } from "express";
import stripe from "../stripe.js";
import authenticate from "../middleware/authenticate.js";
import { findPaymentFromStripeId } from "../service/paymentService.js";
import { getRandomCards } from "../service/cardService.js";
import {
  addOwnedCards,
  createStripeCheckoutSession,
} from "../service/checkoutService.js";
import db from "../model.mjs";

const router = new Router();

router.post("/checkout", authenticate, express.json(), async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || (0 >= quantity && quantity >= 10)) {
    res.sendStatus(400);
    return;
  }

  try {
    const session = await createStripeCheckoutSession(req.user.uuid, quantity);

    res.send({
      sessionUrl: session.url,
    });
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

const endpointSecret = process.env.WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error(err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const paymentIntentSucceeded = event.data.object;
        const payment = await findPaymentFromStripeId(
          paymentIntentSucceeded.id,
        );
        const user = await db.User.findOne({
          where: { id: payment.user },
        });
        console.log(`UUID of User: ${user.uuid}`);

        const cards = await getRandomCards();
        try {
          await addOwnedCards(user.uuid, cards);
        } catch (e) {
          console.error(e);
          res.status(500);
          res.send(e);
          return;
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
  },
);

export default router;

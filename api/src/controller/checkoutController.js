import express, { Router } from "express";
import stripe from "../stripe.js";
import authenticate from "../middleware/authenticate.js";
import { findPaymentFromStripeId } from "../service/paymentService.js";
import { getRandomCards } from "../service/cardService.js";
import {
  addOwnedCards,
  createStripeCheckoutSession,
} from "../service/checkoutService.js";

const router = new Router();

router.post("/checkout", authenticate, express.json(), async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || (0 >= quantity && quantity >= 10)) {
    res.sendStatus(400);
    return;
  }

  const session = createStripeCheckoutSession(req.user.id, quantity);

  res.send({
    sessionUrl: session.url,
  });
});

const endpointSecret = process.env.WEBHOOK_SECRET;

router.post(
  "/webhook",
  express.raw({ type: "*/*" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      console.error(err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const paymentIntentSucceeded = event.data.object;
        const payment = await findPaymentFromStripeId(
          paymentIntentSucceeded.id,
        );

        const cards = await getRandomCards();
        await addOwnedCards(payment.user, cards);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  },
);

export default router;

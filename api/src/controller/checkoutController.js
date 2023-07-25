import express, { Router } from "express";
import stripe from "../stripe.js";
import authenticate from "../middleware/authenticate.js";
import db from "../model.mjs";

const router = new Router();

const YOUR_DOMAIN = "http://localhost:3000";
const PRICE_ID = "price_1NXh1MBaDFkq1eT7WgjcvIkN";

router.post("/checkout", authenticate, express.json(), async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || (0 >= quantity && quantity >= 10)) {
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

  await db.Payment.create({
    user: req.user.id,
    stripeId: session.id,
  });

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

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const paymentIntentSucceeded = event.data.object;
        const payment = await db.Payment.findOne({
          where: {
            stripeId: paymentIntentSucceeded.id,
          },
        });
        console.log("payment success for user: ", payment.user);
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  },
);

export default router;

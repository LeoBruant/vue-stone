import { Router } from "express";
import stripe from "../stripe.js";
import db from "../model.mjs";
import authenticate from "../middleware/authenticate.js";

const router = new Router();

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post(
  "/checkout",
  authenticate,
  /**
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  async (req, res) => {
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await db.Payment.create({
      user: req.user.id,
      stripeId: paymentIntent.id,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  },
);

const YOUR_DOMAIN = "http://localhost:3000";
const PRICE_ID = "price_1NXh1MBaDFkq1eT7WgjcvIkN";

router.post("/create-checkout-session", authenticate, async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/#/checkout/success`,
    cancel_url: `${YOUR_DOMAIN}/#/checkout/cancelled`,
  });

  res.redirect(303, session.url);
});

export default router;

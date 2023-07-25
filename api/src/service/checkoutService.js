import stripe from "../stripe.js";
import db from "../model.mjs";

const YOUR_DOMAIN = "http://localhost:3000";
const PRICE_ID = "price_1NXh1MBaDFkq1eT7WgjcvIkN";

/**
 * Creates a new Stripe checkout session and inserts it into the Payment table.
 * @param {number} userId Integer id of the user
 * @param {number} quantity Amount of booster packs to buy
 * @returns {Promise<Stripe.Checkout.Session & {lastResponse: {headers: {[p: string]: string}, requestId: string, statusCode: number, apiVersion?: string, idempotencyKey?: string, stripeAccount?: string}}>}
 */
export async function createStripeCheckoutSession(userId, quantity) {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: PRICE_ID,
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/#/checkout/success`,
    cancel_url: `${YOUR_DOMAIN}/#/checkout/cancelled`,
  });

  await db.Payment.create({
    user: userId,
    stripeId: session.id,
  });

  return session;
}

/**
 * @param {number} user
 * @param {Model[]} cards
 * @returns {Promise<void>}
 */
export async function addOwnedCards(user, cards) {
  await Promise.all(
    cards.map((card) =>
      db.OwnedCard.create({
        user,
        card,
      }),
    ),
  );
}

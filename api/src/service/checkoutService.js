import stripe from "../stripe.js";
import db from "../model.mjs";
import { findOneUserByUuid } from "./userService.js";
import { Users } from "../mongodb.js";

const YOUR_DOMAIN = process.env.FRONT_URL ?? "https://vuestone.quozul.dev";
const PRICE_ID = "price_1NXh1MBaDFkq1eT7WgjcvIkN";

/**
 * Creates a new Stripe checkout session and inserts it into the Payment table.
 * @param {string} userUuid Integer id of the user
 * @param {number} quantity Amount of booster packs to buy
 * @returns {Promise<Stripe.Checkout.Session & {lastResponse: {headers: {[p: string]: string}, requestId: string, statusCode: number, apiVersion?: string, idempotencyKey?: string, stripeAccount?: string}}>}
 */
export async function createStripeCheckoutSession(userUuid, quantity) {
  const user = await findOneUserByUuid(userUuid);

  const mongoUser = await Users.findOne({ uuid: user.uuid });

  if (!user || !mongoUser) {
    throw Error("User not found");
  }

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
    user: user.id,
    stripeId: session.id,
    packs: quantity,
  });

  return session;
}

/**
 * @param {string} uuid
 * @param {Cards[]} cards
 * @returns {Promise<void>}
 */
export async function addOwnedCards(uuid, cards) {
  const user = await Users.findOne({ uuid });
  if (!user) {
    throw Error("User not found");
  }
  user.ownedCards.push(...cards);
  await user.save();
  console.log(`Added ${cards.length}`);
}

import db from "../model.mjs";

/**
 * @param {string} id Id of the Stripe's checkout session
 * @returns {Promise<Payment>}
 */
export async function findPaymentFromStripeId(id) {
  return await db.Payment.findOne({
    where: {
      stripeId: id,
    },
  });
}

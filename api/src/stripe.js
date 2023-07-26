import Stripe from "stripe";
import { config } from "dotenv";

config();

const stripe = new Stripe(process.env.STRIPE_SK, {
  apiVersion: "2022-11-15",
});

export default stripe;

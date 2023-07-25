import { createCards } from "./cardFixtures.js";
import { initMongo } from "../mongodb.js";
import mongoose from "mongoose";

await initMongo();

try {
  await createCards();
} catch (e) {
  console.error(e);
}

await mongoose.disconnect();

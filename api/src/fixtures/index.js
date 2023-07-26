import { config } from "dotenv";
import mongoose from "mongoose";
import { initMongoDb } from "../mongodb.js";
import { createCards } from "./cardFixtures.js";

config();

await initMongoDb();

try {
  await createCards();
} catch (e) {
  console.error(e);
}

await mongoose.disconnect();

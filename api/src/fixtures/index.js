import { createCards } from "./cardFixtures.js";
import { initMongoDb } from "../mongodb.js";
import mongoose from "mongoose";
import { config } from "dotenv";

config();
await initMongoDb();

try {
  await createCards();
} catch (e) {
  console.error(e);
}

await mongoose.disconnect();

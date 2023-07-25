import { createCards } from "./cardFixtures.js";
import { initMongoDb } from "../mongodb.js";
import mongoose from "mongoose";

await initMongoDb();

try {
  await createCards();
} catch (e) {
  console.error(e);
}

await mongoose.disconnect();

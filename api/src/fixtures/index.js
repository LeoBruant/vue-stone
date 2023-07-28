import { config } from "dotenv";
import mongoose from "mongoose";
import { initMongoDb, Users } from "../mongodb.js";
import { createCards } from "./cardFixtures.js";
import db from "../model.mjs";
import crypto from "node:crypto";

config();

await initMongoDb();
await db.connection.sync({ force: true });

try {
  await createCards();
} catch (e) {
  console.error(e);
}

try {
  try {
    const count= await Users.countDocuments();
    console.log(`Deleting ${count} users from mongo...`)
    await Users.deleteMany({})
  } catch (e) {
    console.error(e)
  }

  const email = process.env.INIT_EMAIL ?? "admin@vuestone.com";
  const password = process.env.INIT_PASSWORD ?? "Test1234&";

  await db.User.create({
    name: "admin",
    email,
    password,
    uuid: crypto.randomUUID(),
    isAdmin: true,
  });

  console.log(`Inserted "${email}" user with "${password}" password.`);
} catch (e) {
  console.error(e);
}

await mongoose.disconnect();
await db.connection.close();

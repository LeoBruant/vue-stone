import mongoose, { Schema } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const cardSchema = new Schema({
  title: { type: String },
  cardType: { type: String },
  cost: { type: Number },
  power: { type: Number },
  toughness: { type: Number },
  ability: { type: String },
  image: { type: String },
  description: { type: String },
});

export const Users = mongoose.model(
  "Users",
  new Schema({
    uuid: { type: String },
    ownedCards: [cardSchema],
    decks: [[cardSchema]],
  }),
);

export const Cards = mongoose.model("Cards", cardSchema);

/**
 * @returns {Promise<MongoMemoryServer | null>}
 */
export async function initMongoDb() {
  try {
    let dbUrl = process.env.MONGO_URL;
    let mongod = null;
    if (process.env.NODE_ENV === "test") {
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    const conn = await mongoose.connect(dbUrl);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    return mongod;
  } catch (err) {
    console.error(err);
  }

  return null;
}

/**
 * @param {MongoMemoryServer | null} mongod
 * @returns {Promise<void>}
 */
export async function disconnectMongoDb(mongod) {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
    console.log("MongoDB disconnected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

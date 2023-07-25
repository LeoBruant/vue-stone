import mongoose, { Schema } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const cardSchema = new Schema({
  id: { type: Number, unique: true },
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
    id: { type: Number, unique: true },
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
    let dbUrl = "mongodb://root:password@localhost:27017/";
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
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

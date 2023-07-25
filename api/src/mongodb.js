import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Schema } from "mongoose";

const abilitySchema = new Schema({
  destroyMininon: { type: Boolean, default: null },
  drawnCards: { type: Number, default: null },
  minionPower: { type: Number, default: null },
  minionToughness: { type: Number, default: null },
  powerAdded: { type: Number, default: null },
  randomMinionsNumber: { type: Number, default: null },
  summonNumber: { type: Number, default: null },
  switchStats: { type: Boolean, default: null },
  toughnessAdded: { type: Number, default: null },
  trigger: { type: String, enum: ["appear", "death", null], default: null },
  type: {
    type: String,
    enum: [
      "addMinionToHand",
      "discardOpponentCards",
      "drawCards",
      "gainForEachAlly",
      "haste",
      "summon",
      "targetAllAllies",
      "targetAllAllyMinions",
      "targetAllOpponents",
      "targetAllyPlayer",
      "targetOpponentPlayer",
      "targetRandomAlly",
      "targetRandomAllyMinion",
      "targetRandomOpponent",
      "taunt",
    ],
  },
});

const effectSchema = new Schema({
  destroyMinion: { type: Boolean, default: false },
  drawnCards: { type: Number, default: null },
  powerAdded: { type: Number, default: null },
  randomMinionsNumber: { type: Number, default: null },
  toughnessAdded: { type: Number, default: null },
  type: {
    type: Array,
    enum: [
      "drawCards",
      "targetAll",
      "targetAllAllyMinions",
      "targetAllMinions",
      "targetAllOpponentMinions",
      "targetAllyMinion",
      "targetAllyPlayer",
      "targetAny",
      "targetOpponent",
      "targetOpponentMinion",
      "targetOpponentPlayer",
      "targetMinion",
      "targetRandomOpponentMinions",
    ],
  },
});

const cardSchema = new Schema({
  ability: abilitySchema,
  attacks: { type: Number, default: 1 },
  cost: { type: Number },
  description: { type: String },
  power: { type: Number },
  rarity: {
    type: String,
    enum: ["common", "rare", "epic", "legendary"],
    default: "common",
  },
  spell: [effectSchema],
  title: { type: String, default: "" },
  toughness: { type: Number },
});

export const Users = mongoose.model(
  "Users",
  new Schema({
    id: { type: Number, unique: true },
    ownedCards: [cardSchema],
    decks: [[cardSchema]],
  })
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

import mongoose, { Schema } from "mongoose";

export const Users = mongoose.model(
  "Users",
  new Schema({
    id: { type: Number, unique: true },
  }),
);

export const Cards = mongoose.model(
  "Cards",
  new Schema({
    id: { type: Number, unique: true },
    title: { type: String },
    cardType: { type: String },
    cost: { type: Number },
    power: { type: Number },
    toughness: { type: Number },
    ability: { type: String },
    image: { type: String },
    description: { type: String },
  }),
);

export const Decks = mongoose.model(
  "Decks",
  new Schema({
    // https://stackoverflow.com/a/18002078
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cards" }],
  }),
);

export async function initMongo() {
  await mongoose.connect("mongodb://user:password@localhost:27017/images");
}

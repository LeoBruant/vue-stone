import mongoose, { Schema } from "mongoose";

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

export async function initMongo() {
  await mongoose.connect("mongodb://root:password@localhost:27017/");
}

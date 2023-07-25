import db from "../model.mjs";

export async function createDecks() {
  await db.Deck.create({
    id: 1,
    UserId: null,
  });
  await db.Deck.create({
    id: 2,
    UserId: null,
  });
  await db.Deck.create({
    id: 3,
    UserId: null,
  });
  await db.Deck.create({
    id: 4,
    UserId: null,
  });
}

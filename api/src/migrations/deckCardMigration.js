import db from "../model.mjs";

async function createDeckCards(DeckId, cardIds) {
  const insert = cardIds.map((CardId) =>
    db.DeckCard.create({
      DeckId,
      CardId,
    }),
  );
  await Promise.all(insert);
}

export default async function () {
  await createDeckCards(
    1,
    [
      47, 47, 48, 48, 49, 49, 32, 32, 50, 50, 51, 51, 52, 52, 53, 53, 73, 73,
      54, 54, 55, 55, 56, 56, 57, 57, 58, 58, 91, 91,
    ],
  );
  await createDeckCards(
    2,
    [
      86, 86, 70, 70, 33, 33, 38, 38, 21, 21, 42, 42, 87, 87, 71, 71, 43, 43,
      88, 88, 44, 44, 45, 45, 89, 89, 90, 90, 46, 46,
    ],
  );
  await createDeckCards(
    3,
    [
      81, 81, 82, 82, 65, 65, 36, 36, 37, 37, 67, 67, 83, 83, 38, 38, 84, 84,
      16, 16, 39, 39, 40, 40, 85, 85, 41, 41, 32, 32,
    ],
  );
  await createDeckCards(
    4,
    [
      31, 31, 75, 75, 76, 76, 59, 59, 32, 32, 33, 33, 64, 64, 61, 61, 60, 60,
      34, 34, 62, 62, 63, 63, 78, 78, 79, 79, 80, 80,
    ],
  );
}

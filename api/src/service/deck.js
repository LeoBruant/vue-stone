import { Users } from "../mongodb.js";

/**
 * @param {string} uuid
 * @returns {Promise<Cards[]>}
 */
export async function getOwnedCards(uuid) {
  const user = await Users.findOne({ uuid });
  return user.ownedCards;
}

/**
 * @param {string} uuid
 * @param {number[]} wantedCards
 * @returns {Promise<void>}
 */
export async function createDeck(uuid, wantedCards) {
  const ownedCards = await getOwnedCards(uuid);

  const ownedCardIds = ownedCards.map(({ cardId }) => cardId);

  for (const id of wantedCards) {
    if (!ownedCardIds.includes(id)) {
      console.log(`User does not owns the card ${id}`);
      return null;
    }
  }

  const deck = wantedCards.map((id) =>
    ownedCards.find(({ cardId }) => cardId === id),
  );

  const user = await Users.findOne({ uuid: uuid });
  user.decks.push(deck);
  await user.save();

  return deck;
}

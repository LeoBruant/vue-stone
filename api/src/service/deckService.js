import { Users } from "../mongodb.js";

/**
 * @param {string} uuid
 * @returns {Promise<Cards[]>}
 */
export async function getOwnedCards(uuid) {
  const user = await Users.findOne({ uuid });
  return user.ownedCards;
}

export async function addOneDeck(uuid, deck) {
  const user = await Users.findOne({ uuid });
  user.decks.push(deck);
  await user.save();
}

/**
 * @param {string} uuid
 * @param {number[]} wantedCards
 * @returns {Promise<Object[]>}
 */
export async function createDeck(uuid, wantedCards) {
  const ownedCards = await getOwnedCards(uuid);

  /**
   * @type {number[]}
   */
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

  try {
    await addOneDeck(uuid, deck);
  } catch (e) {
    console.error(e);
  }

  return deck;
}

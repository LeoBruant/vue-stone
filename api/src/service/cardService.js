import db from "../model.mjs";
import fs from "fs/promises";
import { join } from "path";
import { Cards } from "../mongodb.js";

export async function createCard(body) {
  const document = new Cards(body);
  return await document.save();
}

export async function createCardImage(id, outputFolder, body) {
  try {
    await fs.access(outputFolder);
  } catch {
    await fs.mkdir(outputFolder, { recursive: true });
  }

  const outputPath = join(outputFolder, `${id}.jpg`);

  try {
    await fs.writeFile(outputPath, body);
    (await db.Card.findByPk(id)).update({ image: outputPath });

    return "created";
  } catch (e) {
    return "error";
  }
}

export async function findCards() {
  return Cards.find();
}

export async function findCardById(cardId) {
  return Cards.findOne({ cardId });
}

/**
 * Get an array of random cards
 * @param {number} size
 * @returns {Promise<Cards[]>}
 */
export async function getRandomCards(size = 5) {
  return Cards.aggregate([{ $sample: { size } }]);
}

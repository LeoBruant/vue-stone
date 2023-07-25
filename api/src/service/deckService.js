import db from "../model.mjs";
import fs from "fs/promises";
import { join } from "path";

export async function createDeck(body) {
  return await db.Deck.create(body);
}

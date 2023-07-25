import db from "../model.mjs";
import fs from "fs/promises";
import { join } from "path";

export async function createDeckCard(body) {
  return await db.DeckCard.create(body);
}

import db from "../model.mjs";
import fs from "fs/promises";
import { join } from "path";
import {Cards} from "../mongodb.js";


export async function createCard(body) {
  return await db.Card.create(body);
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
  return await Cards.find()
}

export async function findCardById(id) {
  return await db.Card.findAll({
    where: {
      id: id,
    },
  });
}

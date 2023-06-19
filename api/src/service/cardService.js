import db from "../model.mjs";
import fs from "fs/promises";
import {join} from "path";

export async function createCard(body) {
    return await db.Card.create(body)
}

export async function createCardImage(id, outputFolder, body){
    try {
        await fs.access(outputFolder);
    } catch {
        await fs.mkdir(outputFolder, { recursive: true });
    }

    const outputPath = join(outputFolder, `${id}.jpg`);

    try {
        await fs.writeFile(outputPath, body);

        // Maintenant que l'image est créer, il ne te reste plus qu'à enregistré son chemin en base
        // Le chemin a enregistré est dans la variable "outputPath"
        // TODO: Enregistrer le chemin d'accès à l'image dans la base de données
        (await db.Card.findByPk(1)).update({img: outputPath});


        return "created";
    } catch (e) {
        return "error";
    }
}

export async function findCards(filter) {
    return await db.Card.findAll({ where: filter })
}

export async function findCardById(id) {
    return await db.Card.findAll({
        where: {
            id: id
        }
    })
}
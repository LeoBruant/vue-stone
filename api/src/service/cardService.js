import db from "../model.mjs";

export async function createCard(title, cost) {
    await db.Card.create({ title, cost })
    return { title, cost };
}

export async function findCards() {
    return await db.Card.findAll()
}

export async function findCard(title) {
    return await db.Card.findAll({
        where: {
            title: title
        }
    })
}
import db from "../model.mjs";

export async function createCard(body) {
    return await db.Card.create(body)
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
import Card from "../model/Card"
import {Sequelize, DataTypes} from "sequelize";
const sequelize = new Sequelize('postgres://user:password@localhost:5432/db')

export function createCard(title, description) {
    // Effectue des calculs...
    Card.create({ title, description })
}
import {Sequelize, DataTypes} from "sequelize";
const sequelize = new Sequelize('postgres://user:password@localhost:5432/db')

// import db from "../model.mjs";


const Card = sequelize.define('Card', {
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true
});

// `sequelize.define` also returns the model
console.log(Card === sequelize.models.Card); // true

await sequelize.sync({ force: true });



export default Card
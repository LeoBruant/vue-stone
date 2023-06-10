import { DataTypes, Model } from "sequelize";

export default function(connection) {
    class Card extends Model {

    }

    Card.init({
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: connection,
        tableName: "cards",
    });

    return Card;
}
import { DataTypes, Model } from "sequelize";

export default function (connection) {
  class Card extends Model {}

  Card.init(
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      power: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toughness: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ability: {
        type: DataTypes.ENUM("provocation", "rale", "rale soin", "entree +1+1"),
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: connection,
      tableName: "cards",
    }
  );

  return Card;
}

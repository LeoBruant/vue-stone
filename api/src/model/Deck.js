import { DataTypes, Model } from "sequelize";

export default function (connection) {
  class Deck extends Model {}

  Deck.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize: connection,
      tableName: "decks",
    },
  );

  return Deck;
}

import { DataTypes, Model } from "sequelize";

export default function (connection) {
  class DeckCard extends Model {}

  DeckCard.init(
    {
      DeckId: {
        type: DataTypes.INTEGER,
        references: {
          model: "decks",
          key: "id",
        },
        allowNull: false,
      },
      CardId: {
        type: DataTypes.INTEGER,
        references: {
          model: "cards",
          key: "id",
        },
      },
    },
    {
      sequelize: connection,
      tableName: "deckCards",
    },
  );

  return DeckCard;
}

import { DataTypes, Model } from "sequelize";

export default function (connection) {
  class OwnedCard extends Model {}

  OwnedCard.init(
    {
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      card: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cards",
          key: "id",
        },
      },
    },
    {
      sequelize: connection,
      tableName: "owned_cards",
    },
  );

  return OwnedCard;
}

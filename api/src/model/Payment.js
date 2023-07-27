import { DataTypes, Model } from "sequelize";

/**
 * @param {Sequelize} connection
 */
export default function (connection) {
  class Payment extends Model {}

  Payment.init(
    {
      stripeId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      packs: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: connection,
      tableName: "payments",
    },
  );

  return Payment;
}

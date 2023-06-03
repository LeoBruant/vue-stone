import { DataTypes, Model } from "sequelize";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export default function (connection) {
  const salt =
    process.env.SALT ??
    (console.warn(
      "No salt provided in environment. Please consider setting an environment variable, eg. `export SALT=R4nd0M`."
    ),
    "salt");

  const jwtSecret =
    process.env.JWT_SECRET ??
    (console.warn(
      "No JWT secret provided in environment. Please consider setting an environment variable, eg. `export JWT_SECRET=R4nd0M`."
    ),
    "secret");

  class User extends Model {
    checkPassword(password) {
      const hashedPassword = crypto
        .createHmac("SHA-256", salt)
        .update(password)
        .digest()
        .toString("hex");
      return hashedPassword === this.password;
    }

    generateToken() {
      return jwt.sign({ id: this.id }, jwtSecret, {
        expiresIn: "1y",
      });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          isNotNull: function (value) {
            if (value === null) {
              throw new Error("Email cannot be null");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 8,
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        },
      },
    },
    {
      sequelize: connection,
      tableName: "users",
    }
  );

  async function encryptPassword(user, options) {
    if (!options?.fields.includes("password")) {
      return;
    }

    user.password = crypto
      .createHmac("SHA-256", salt)
      .update(user.password)
      .digest()
      .toString("hex");
  }

  User.addHook("beforeCreate", encryptPassword);
  User.addHook("beforeUpdate", encryptPassword);

  return User;
}

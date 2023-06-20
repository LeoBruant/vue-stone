import fs from "fs/promises";
import path from "path";
import { Model, Sequelize } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

const databaseUrl =
  process.env.DATABASE_URL ?? "postgres://user:password@localhost:5432/db";
const connection = new Sequelize(databaseUrl);

/**
 * @type {{connection: Sequelize, [key: string]: Model}}
 */
const db = {
  connection,
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = await fs.readdir(path.join(__dirname, "model"));

const models = await Promise.all(
  files.map((file) =>
    import(pathToFileURL(path.join(__dirname, "model", file)))
  )
);

for (const model of models) {
  const { default: modelFn } = model;
  const modelInstance = modelFn(connection);
  db[modelInstance.name] = modelInstance;
}

await db.connection.sync({ force: true });

export default db;

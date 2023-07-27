import { disconnectMongoDb, initMongoDb } from "./src/mongodb.js";
import { afterAll, beforeAll, vi } from "vitest";

vi.stubEnv("DATABASE_URL", "sqlite::memory:");
vi.stubEnv("NODE_ENV", "test");

let mongod;

beforeAll(async () => {
  mongod = await initMongoDb();
});

afterAll(async () => {
  await disconnectMongoDb(mongod);
});

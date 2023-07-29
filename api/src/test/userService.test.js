import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createUser,
  findOneUserByEmail,
  findOneUserByUuid,
  isUserAdmin,
} from "../service/user.js";
import { disconnectMongoDb, initMongoDb } from "../mongodb.js";
import db from "../model.mjs";

describe("userService", () => {
  let mongod;

  beforeAll(async () => {
    await db.connection.sync();
    mongod = await initMongoDb();
  });

  afterAll(async () => {
    await disconnectMongoDb(mongod);
  });

  it("should create and find a user", async () => {
    const email = "foo@example.com";
    const password = "Test1234&";
    const name = "foo";

    const createdUser = await createUser(name, email, password);

    expect(createdUser).toBeDefined();

    const emailUser = await findOneUserByEmail(email);

    expect(emailUser).toBeDefined();
    expect(emailUser.name).toBe(name);

    const uuidUser = await findOneUserByUuid(createdUser.uuid);

    expect(uuidUser).toBeDefined();
    expect(uuidUser.email).toBe(email);
    expect(uuidUser.name).toBe(name);
  });

  it("should match password", async () => {
    const email = "bar@example.com";
    const password = "Test1234&";
    const name = "bar";

    const user = await createUser(name, email, password);

    expect(user.checkPassword(password)).toBeTruthy();
    expect(user.checkPassword("abc")).toBeFalsy();
  });

  it("default user should not be admin", async () => {
    const email = "baz@example.com";
    const password = "Test1234&";
    const name = "baz";

    const user = await createUser(name, email, password);

    expect(await isUserAdmin(user.uuid)).toBeFalsy();
  });
});

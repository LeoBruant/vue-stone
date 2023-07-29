import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "../main.js";
import request from "supertest";
import * as userService from "../service/userService.js";
import crypto from "node:crypto";
import jsonwebtoken from "jsonwebtoken";

describe("user controller", () => {
  const uuid = crypto.randomUUID();
  const jwt = jsonwebtoken.sign({ uuid }, process.env.JWT_SECRET ?? "secret", {
    expiresIn: "1y",
  });

  vi.mock("../service/userController.js", () => {
    return {
      createUser: vi.fn(),
      findAllUsers: vi.fn(),
      isUserAdmin: vi.fn(),
      deleteUser: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return bad request", async () => {
    const response = await request(app).post("/api/user");
    expect(response.status).toEqual(400);
  });

  it("should create a user", async () => {
    const email = "foo@example.com";
    const password = "Test1234&";
    const name = "xX_d4rkn00b_Xx";

    const spy = vi.spyOn(userService, "createUser").mockImplementation(() => ({
      email,
      password,
      name,
      uuid: crypto.randomUUID(),
    }));

    const response = await request(app)
      .post("/api/user")
      .send({
        email,
        password,
        name,
      })
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(201);

    expect(spy).toHaveBeenCalledWith(name, email, password);
  });

  it("should not list users and return 403", async () => {
    const isUserAdminSpy = vi
      .spyOn(userService, "isUserAdmin")
      .mockImplementation(() => false);
    const listUserSpy = vi.spyOn(userService, "findAllUsers");

    const response = await request(app)
      .get("/api/user")
      .set("authorization", `Bearer ${jwt}`)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(403);

    expect(isUserAdminSpy).toHaveBeenCalled();
    expect(listUserSpy).not.toHaveBeenCalled();
  });

  it("should list users", async () => {
    const isUserAdminSpy = vi
      .spyOn(userService, "isUserAdmin")
      .mockImplementation(() => true);
    const listUserSpy = vi.spyOn(userService, "findAllUsers");

    const response = await request(app)
      .get("/api/user")
      .set("authorization", `Bearer ${jwt}`)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(200);

    expect(isUserAdminSpy).toHaveBeenCalled();
    expect(listUserSpy).toHaveBeenCalled();
  });

  it("should delete user", async () => {
    const isUserAdminSpy = vi
      .spyOn(userService, "isUserAdmin")
      .mockImplementation(() => true);
    const deleteUserSpy = vi
      .spyOn(userService, "deleteUser")
      .mockImplementation(() => true);

    const response = await request(app)
      .delete("/api/user/1")
      .set("authorization", `Bearer ${jwt}`)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(204);

    expect(isUserAdminSpy).toHaveBeenCalled();
    expect(deleteUserSpy).toHaveBeenCalledWith(1);
  });
});

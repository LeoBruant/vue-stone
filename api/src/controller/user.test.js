import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "../main.js";
import request from "supertest";
import * as userService from "../service/user.js";

describe("user controller", () => {
  vi.mock("../service/user.js", () => {
    return {
      createUser: vi.fn(),
      findAllUsers: vi.fn()
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return bad request", async () => {
    const response = await request(app).post("/user");
    expect(response.status).toEqual(400);
  });

  it("should create a user", async () => {
    const spy = vi.spyOn(userService, "createUser");

    const response = await request(app)
      .post("/user")
      .send({ email: "foo@example.com", password: "changeme", name: "xX_d4rkn00b_Xx" })
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(201);

    expect(spy).toHaveBeenCalled();
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";
import { app } from "../main.js";
import request from "supertest";
import * as deckService from "../service/deckService.js";
import jsonwebtoken from "jsonwebtoken";
import crypto from "node:crypto";

describe("deck controller", () => {
  const uuid = crypto.randomUUID();
  const jwt = jsonwebtoken.sign({ uuid }, process.env.JWT_SECRET ?? "secret", {
    expiresIn: "1y",
  });

  vi.mock("../service/deckController.js", () => {
    return {
      createDeck: vi.fn(),
      getOwnedCards: vi.fn(),
      addOneDeck: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return bad request", async () => {
    const response = await request(app)
      .post("/api/deck")
      .set("authorization", `Bearer ${jwt}`);
    expect(response.status).toEqual(400);
  });

  it("should create a new deck", async () => {
    const wantedCards = [1, 42, 69];

    const createDeckSpy = vi
      .spyOn(deckService, "createDeck")
      .mockImplementation(() => [{}]);

    const response = await request(app)
      .post("/api/deck")
      .set("authorization", `Bearer ${jwt}`)
      .send(wantedCards)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(201);

    expect(createDeckSpy).toHaveBeenCalledWith(uuid, wantedCards);
  });

  it("should return 400 when not owning a card", async () => {
    const wantedCards = [1, 42, 69];

    const createDeckSpy = vi
      .spyOn(deckService, "createDeck")
      .mockImplementation(() => null);

    const response = await request(app)
      .post("/api/deck")
      .set("authorization", `Bearer ${jwt}`)
      .send(wantedCards)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(400);

    expect(createDeckSpy).toHaveBeenCalledOnce();
  });
});

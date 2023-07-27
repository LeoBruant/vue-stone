import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { app } from "../main.js";
import request from "supertest";
import * as deckService from "../service/deck.js";
import jsonwebtoken from "jsonwebtoken";
import crypto from "node:crypto";
import { disconnectMongoDb, Users } from "../mongodb.js";
import { defaultCards, defaultDecks } from "../fixtures/deckCardFixtures.js";

describe("deck controller", () => {
  const uuid = crypto.randomUUID();
  const jwt = jsonwebtoken.sign({ uuid }, process.env.JWT_SECRET ?? "secret", {
    expiresIn: "1y",
  });
  let mongod;

  beforeAll(async () => {
    const user = new Users({
      uuid,
      decks: defaultDecks,
      cards: defaultCards,
    });
    await user.save();
  });

  afterAll(async () => {
    await disconnectMongoDb(mongod);
  });

  vi.mock("../service/deck.js", () => {
    return {
      createDeck: vi.fn(),
      getOwnedCards: vi.fn(),
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
      .mockImplementation(() => {});

    const ownedCardsSpy = vi
      .spyOn(deckService, "getOwnedCards")
      .mockImplementation(() => {
        return wantedCards.map((cardId) => ({ cardId }));
      });

    const response = await request(app)
      .post("/api/deck")
      .set("authorization", `Bearer ${jwt}`)
      .send(wantedCards)
      .set("Content-Type", "application/json");

    console.log(response.text);

    expect(response.status).toEqual(201);

    expect(createDeckSpy).toHaveBeenCalledWith(uuid, wantedCards);
    expect(ownedCardsSpy).toHaveBeenCalledWith(uuid);
  });

  it("should return 400 when not owning a card", async () => {
    const wantedCards = [1, 42, 69];

    const response = await request(app)
      .post("/api/deck")
      .set("authorization", `Bearer ${jwt}`)
      .send(wantedCards)
      .set("Content-Type", "application/json");

    expect(response.status).toEqual(400);
  });
});

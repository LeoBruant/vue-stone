import express, { Router } from "express";
import { join, resolve } from "path";
import {
  createCard,
  createCardImage,
  findCardById,
  findCards,
} from "../service/cardService.js";

const router = Router();

router.post("/card", express.json(), async (req, res) => {
  const card = await createCard(req.body);
  res.send(card);
});
router.post(
  "/card/image/:cardId",
  express.raw({ type: "image/jpeg", limit: "10mb" }),
  async (req, res) => {
    const { cardId } = req.params;
    const outputFolder = join(resolve(), "images");
    const body = req.body;
    res.send(await createCardImage(cardId, outputFolder, body));
  },
);

router.get("/card", express.json(), async (req, res) => {
  // const { ...filter } = req.query; // récupère tous les critères dans le query
  res.send(await findCards());
});

router.get("/card/:cardId", express.json(), async (req, res) => {
  const id = req.params.cardId;
  const card = await findCardById(id);
  res.send(card);
});

export default router;

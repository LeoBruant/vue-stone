import {createCard, findCards, findCardById} from "../service/cardService.js";
import { Router } from "express";
import { join, resolve } from "path";
import fs from "fs/promises";
import bodyParser from "body-parser";

const router = Router();

router.post("/card", async (req, res) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    console.log(req.body);
    const card = await createCard(req.body);
    res.send(card);
});
//
router.post("/card/image/:cardId",
bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
(req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

router.get("/card", async (req, res) => {
    const {...filter} = req.query; // récupère tous les critères dans le query
    res.send(await findCards(filter));
});

router.get("/card/:cardId", async(req, res) => {
    const id = req.params.cardId;
    const card = await findCardById(id);
    res.send(card);
})


export default router;

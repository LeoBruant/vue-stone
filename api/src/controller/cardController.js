import {createCard, findCards, findCard} from "../service/cardService.js";
import { Router } from "express";

const router = Router();

router.post("/create-card", async (req, res) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    console.log(req.body);
    const {title, cost} = req.body;
    const card = await createCard(title, cost);
    res.send(card);
});

router.get("/get-cards", async(req,res) => {
    const cards = await findCards()
    res.send(cards)
});

router.get("/get-card", async(req, res) => {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++");
    console.log(req.body);
    const {title} = req.body;
    const card = await findCard(title);
    res.send(card);
})

export default router;

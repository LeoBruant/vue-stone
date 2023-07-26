import express, { Router } from "express";
import { join, resolve } from "path";
import {
    createCard,
    createCardImage,
    findCardById,
    findCards,
} from "../service/cardService.js";
import router from "./cardController.js";
import authentication from "./authentication.js";
import authenticate from "../middleware/authenticate.js";
import {Users} from "../mongodb.js";

router.get("/deck", authenticate , async(req, res) => {
    const user = await Users.findOne({id: req.user.id});
    res.send(user.decks);
});

export default router;
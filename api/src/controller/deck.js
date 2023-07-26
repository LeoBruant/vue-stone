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

router.get("/deck", authentication ,(req, res) => {
    res.send(":)");
});

export default router;
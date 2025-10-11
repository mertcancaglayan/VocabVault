import express from "express";
import * as wordsController from "../controllers/wordsController.js";

const router = express.Router();

router.get("/", wordsController.getDictionary);

router.get("/category/:category/lang/:langPair", wordsController.getWordsByCategory);

export default router;

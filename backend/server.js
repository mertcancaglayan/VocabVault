import express, { json } from "express";
import cors from "cors";
import { readCategoryJson, readTranslationJson } from "./helpers/fileHelper.js";
import { getQuestions } from "./helpers/createQuestions.js";

const app = express();
app.use(cors());
app.use(json());

const wordCategories = readCategoryJson();

app.get("/", (req, res) => res.send("API is running"));

app.get("/categories", (req, res) => {
	return res.json(Object.keys(wordCategories));
});

app.get("/quiz/category/:category/:fromLang/:toLang", (req, res) => {
	const { category, fromLang, toLang } = req.params;

	if (!wordCategories[category]) {
		return res.status(404).json({ error: "Category not found" });
	}

	const fromTranslations = readTranslationJson(fromLang);
	const toTranslations = readTranslationJson(toLang);

	const questions = getQuestions(wordCategories, fromTranslations, toTranslations, category);

	return res.json(questions);
});

app.listen(5000, () => console.log("Server running on port 5000"));

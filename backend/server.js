const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const wordCategories = JSON.parse(fs.readFileSync("./public/db/words.json", "utf-8"));

app.get("/", (req, res) => res.send("API is running"));

app.get("/categories", (req, res) => {
	res.json(Object.keys(wordCategories));
});

app.get("/quiz/category/:category/:fromLang/:toLang", (req, res) => {
	const { category, fromLang, toLang } = req.params;

	if (!wordCategories[category]) {
		return res.status(404).json({ error: "Category not found" });
	}

	const fromTranslations = JSON.parse(fs.readFileSync(`./public/db/translations_${fromLang}.json`, "utf-8"));
	const toTranslations = JSON.parse(fs.readFileSync(`./public/db/translations_${toLang}.json`, "utf-8"));

	const items = wordCategories[category].map((id) => ({
		id,
		from: fromTranslations[category]?.[id] || null,
		to: toTranslations[category]?.[id] || null,
	}));

	res.json(items);
});

app.listen(5000, () => console.log("Server running on port 5000"));

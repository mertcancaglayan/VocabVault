const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const words = JSON.parse(fs.readFileSync("./public/db/words.json", "utf-8"));
const translations = JSON.parse(fs.readFileSync("./public/db/translations_english.json", "utf-8"));

app.get("/", (req, res) => res.send("API is running"));

app.get("/api/categories", (req, res) => {
	res.json(Object.keys(words));
});

app.get("/api/categories/:name", (req, res) => {
  const category = req.params.name;
  if (!words[category]) return res.status(404).json({ error: "Category not found" });

  const items = words[category].map(id => ({
    id,
    translation: translations[category][id] || null
  }));

  res.json(items);
});

app.listen(5000, () => console.log("Server running on port 5000"));

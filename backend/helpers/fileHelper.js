import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readCategoryJson = () => {
	const filePath = join(__dirname, "../public/db/words.json");
	return JSON.parse(readFileSync(filePath, "utf-8"));
};

const readTranslationJson = (lang) => {
	const filePath = join(__dirname, `../public/db/translations_${lang}.json`);
	return JSON.parse(readFileSync(filePath, "utf-8"));
};

export { readCategoryJson, readTranslationJson };

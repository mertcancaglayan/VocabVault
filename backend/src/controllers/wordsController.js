import Dictionary from "../models/Dictionary.js";
import formatQuestions from "../../helpers/createQuestions.js";

export const getDictionary = async (req, res) => {
	try {
		const dictionary = await Dictionary.find();
		res.status(200).json(dictionary);
	} catch (error) {
		console.error("Error in getDictionary controller", error);
		res.status(500).json({ message: error.message });
	}
};

export const getWordsByCategory = async (req, res) => {
	try {
		const { category, langPair } = req.params;
		const [lang1, lang2] = langPair.split("-");

		if (!category || !lang1 || !lang2) {
			return res.status(400).json({ message: "Category and language pair are required" });
		}

		const dictionary = await Dictionary.find({ category: category.toLowerCase() });

		if (!dictionary.length) {
			return res.status(404).json({ message: `No words found for category: ${category}` });
		}

		const words = formatQuestions(dictionary, lang1, lang2);

		res.status(200).json(words);
	} catch (error) {
		console.error("Error in getWordsByCategory controller", error);
		res.status(500).json({ message: error.message });
	}
};

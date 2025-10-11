import mongoose from "mongoose";

const dictionarySchema = new mongoose.Schema(
	{
		_id: { type: String, required: true },
		category: { type: String, required: true },
		translations: {
			tr: { type: String },
			en: { type: String },
			pl: { type: String },
		},
		partOfSpeech: { type: String },
	},
	{ collection: "dictionary" },
);

const Dictionary = mongoose.model("Dictionary", dictionarySchema);

export default Dictionary;

import shuffle from "../utils/shuffle.js";

const getRandomWrongWords = (correctWord, allWords) => {
	const otherWords = allWords.filter((w) => w && w !== correctWord);
	return shuffle(otherWords).slice(0, 3);
};

const formatQuestions = (dictionary, lang1, lang2) => {
	const allToWords = dictionary.map((word) => word.translations?.[lang2]).filter(Boolean);

	const words = dictionary
		.filter((word) => word.translations?.[lang1] && word.translations?.[lang2])
		.map((word) => {
			const from = word.translations[lang1];
			const to = word.translations[lang2];
			return {
				id: word.id || word._id,
				from,
				to,
				partOfSpeech: word.partOfSpeech || undefined,
				wrongWords: getRandomWrongWords(to, allToWords),
			};
		});

	return words;
};

export default formatQuestions;

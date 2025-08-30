import shuffle from "../utils/shuffle.js";

const getRandomWrongWords = (firstWord, allWords) => {
	const otherWords = allWords.filter((w) => w !== firstWord);

	const shuffled = shuffle(otherWords);

	return shuffled.slice(0, 3);
};

const getQuestions = (wordCategories, fromTranslations, toTranslations, category) => {
	return wordCategories[category].map((id) => {
		const correctWord = toTranslations[category]?.[id] || null;

		return {
			id,
			from: fromTranslations[category]?.[id] || null,
			to: correctWord,
			wrongWords: getRandomWrongWords(correctWord, Object.values(toTranslations[category])),
		};
	});
};

export { getQuestions };

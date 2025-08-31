export const getScore = (answers) => {
	return Object.values(answers).filter((a) => a.isCorrect).length;
};

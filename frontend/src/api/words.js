export const getCategories = async () => {
	try {
		const response = await fetch("http://localhost:5000/categories");
		if (!response.ok) throw new Error(`Response status: ${response.status}`);
		return await response.json();
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};

export const getWords = async (category, fromLang, toLang) => {
	const url = `http://localhost:5000/quiz/category/${category}/${fromLang}/${toLang}`;
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error(error.message);
	}
};

import Categories from "../models/Category.js";

export const getCategories = async (req, res) => {
	try {
		const categories = await Categories.find();
		res.status(200).json(categories);
	} catch (error) {
		console.error("Error in get controller", error);
		res.status(500).json({ message: error.message });
	}
};

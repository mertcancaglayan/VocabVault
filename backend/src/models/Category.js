import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
	id: { type: String, required: true },
	key: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
});

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;

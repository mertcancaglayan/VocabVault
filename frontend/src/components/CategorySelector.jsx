import React, { useState } from "react";
import MainButton from "./MainButton";
import "../styles/categorySelector.css";

function CategorySelector({ prevStep, nextStep }) {
	const [category, setCategory] = useState("");

	const handleCategorySelect = (selectedCategory) => {
		setCategory(selectedCategory);
	};

	return (
		<section>
			<h2>Choose a Category</h2>
			<div className="categories">
				<button
					data-category="animals"
					className="btn category-btn"
					onClick={() => handleCategorySelect("animals")}
				>
					🐾 Animals
				</button>
				<button
					data-category="foodndrinks"
					className="btn category-btn"
					onClick={() => handleCategorySelect("foodndrinks")}
				>
					🍎 Food & Drinks
				</button>
				<button
					data-category="colors"
					className="btn category-btn"
					onClick={() => handleCategorySelect("colors")}
				>
					🌈 Colors
				</button>
				<button
					data-category="housenfurniture"
					className="btn category-btn"
					onClick={() => handleCategorySelect("housenfurniture")}
				>
					🏠 House & Furniture
				</button>
				<button
					data-category="transportation"
					className="btn category-btn"
					onClick={() => handleCategorySelect("transportation")}
				>
					🚗 Transportation
				</button>
				<button
					data-category="commonverbs"
					className="btn category-btn"
					onClick={() => handleCategorySelect("commonverbs")}
				>
					🔄 Common Verbs
				</button>
			</div>

			<h2>Selected category: {category || "None"}</h2>

			<div className="btn-bottom">
				<MainButton text="Prev" onClick={prevStep} />
				<MainButton text="Next" onClick={nextStep} disabled={!category} />
			</div>
		</section>
	);
}

export default CategorySelector;

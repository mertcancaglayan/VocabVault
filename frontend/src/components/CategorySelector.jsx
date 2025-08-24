import React from "react";
import MainButton from "./MainButton";
import "../styles/categorySelector.css";

function CategorySelector() {
	return (
		<section>
			<h2>Choose a Category</h2>
			<div className="categories">
				<button data-category="animals" className="btn category-btn">
					🐾 Animals
				</button>
				<button data-category="foodndrinks" className="btn category-btn">
					🍎 Food & Drinks
				</button>
				<button data-category="colors" className="btn category-btn">
					🌈 Colors
				</button>
				<button data-category="housenfurniture" className="btn category-btn">
					🏠 House & Furniture
				</button>
				<button data-category="transportation" className="btn category-btn">
					🚗 Transportation
				</button>
				<button data-category="commonverbs" className="btn category-btn">
					🔄 Common Verbs
				</button>
			</div>
			<div className="btn-bottom">
				<MainButton text="Next"></MainButton>
			</div>
		</section>
	);
}

export default CategorySelector;

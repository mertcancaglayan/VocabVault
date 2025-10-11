import React, { useEffect, useState } from "react";
import MainButton from "./MainButton";
import "../styles/categorySelector.css";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/words";

function CategorySelector({ prevStep, nextStep }) {
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState("");

	const categoryEmojis = {
		animals: "🐾🐶",
		body_health: "🧠💪",
		body_parts: "🦵🖐️",
		clothing_and_accessories: "👗🧢",
		colors: "🎨🌈",
		common_verbs: "🏃‍♂️✍️",
		daily_life: "☕🛒",
		ecosystems: "🌿🌎",
		elements: "🔥💧🌬️",
		emotions_and_feelings: "😊😢",
		family_and_people: "👨‍👩‍👧‍👦",
		food_and_drinks: "🍔🍹",
		house_and_furniture: "🏠🛋️",
		landscapes: "🌄🏜️",
		landforms_and_earth: "🏔️🏝️",
		nature: "🌳🌸",
		nature_and_weather: "🌞🌧️",
		numbers: "123️⃣🔢",
		plants_and_trees: "🌱🌴",
		polar_and_arctic: "🐧❄️",
		professions: "👩‍⚕️👨‍🏫",
		school_and_work: "📚💼",
		space_and_sky: "🚀🌌",
		technology: "💻📱",
		transportation: "🚗✈️",
		water_and_climate: "🌊🌦️",
		weather_conditions: "⛈️🌤️",
	};

	const fromLang = localStorage.getItem("wordvault_fromLang");
	const toLang = localStorage.getItem("wordvault_toLang");

	useEffect(() => {
		getCategories().then((data) => {
			console.log(data[0].categories);

			setCategories(data[0].categories);
		});
	}, []);

	const handleCategorySelect = (selectedCategory) => {
		setCategory(selectedCategory);
	};

	let navigateToQuiz = useNavigate();

	return (
		<section className="categories-section">
			<h2>Choose a Category</h2>
			<div className="categories">
				{categories.map((element) => {
					return (
						<button
							key={element.key}
							data-category={element.key}
							className="btn category-btn"
							onClick={() => handleCategorySelect(element)}
						>
							<span>{categoryEmojis[element.key] || "❓"}</span> <strong>{element.label}</strong>
						</button>
					);
				})}
			</div>

			<h2>Selected category: {category.label || "None"}</h2>

			<div className="btn-bottom">
				<MainButton text="Prev" onClick={prevStep} />
				<MainButton
					text="Next"
					onClick={() =>
						navigateToQuiz("/quiz/category", {
							state: { category, fromLang, toLang },
						})
					}
					disabled={!category}
				/>
			</div>
		</section>
	);
}

export default CategorySelector;

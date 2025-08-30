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
		bodyparts: "🦵🖐️",
		clothingnaccessories: "👗🧢",
		colors: "🎨🌈",
		commonverbs: "🏃‍♂️✍️",
		dailylife: "☕🛒",
		ecosystems: "🌿🌎",
		elements: "🔥💧🌬️",
		emotionsnfeelings: "😊😢",
		familynpeople: "👨‍👩‍👧‍👦",
		foodndrinks: "🍔🍹",
		housenfurniture: "🏠🛋️",
		landformsnearth: "🏔️🏝️",
		nature: "🌳🌸",
		naturenweather: "🌞🌧️",
		numbers: "123️⃣🔢",
		plantntrees: "🌱🌴",
		polarnarctic: "🐧❄️",
		professions: "👩‍⚕️👨‍🏫",
		schoolnwork: "📚💼",
		spacensky: "🚀🌌",
		technologyngadgets: "💻📱",
		transportation: "🚗✈️",
		waternclimate: "🌊🌦️",
		weatherconditions: "⛈️🌤️",
	};

	const fromLang = localStorage.getItem("wordvault_fromLang");
	const toLang = localStorage.getItem("wordvault_toLang");
	console.log(fromLang);
	console.log(toLang);

	useEffect(() => {
		getCategories().then((data) => {
			setCategories(data);
		});
	}, []);

	useEffect(() => {
		console.log(categories);
	}, [categories]);

	const handleCategorySelect = (selectedCategory) => {
		setCategory(selectedCategory);
	};

	let navigateToQuiz = useNavigate();

	return (
		<section className="categories-section">
			<h2>Choose a Category</h2>

			<div className="categories">
				{categories.map((element) => {
					const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

					return (
						<button
							key={element}
							data-category={element}
							className="btn category-btn"
							onClick={() => handleCategorySelect(element)}
						>
							{categoryEmojis[element] || "❓"} {capitalize(element)}
						</button>
					);
				})}
			</div>

			<h2>Selected category: {category || "None"}</h2>

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

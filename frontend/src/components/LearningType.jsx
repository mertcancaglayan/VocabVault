import React, { useState } from "react";
import "../styles/global.css";
import "../styles/learningType.css";
import MainButton from "../components/MainButton";

function LearningType({ prevStep, nextStep }) {
	const [selectedType, setSelectedType] = useState(localStorage.getItem("wordvault_learningType") || "");

	const types = [
		{
			id: "flashcards",
			name: "Flashcards",
			desc: "Learn vocabulary with flip cards and memory recall.",
			icon: "🧠",
		},
		{
			id: "quiz",
			name: "Quiz",
			desc: "Test your knowledge with quick multiple-choice questions.",
			icon: "📝",
		},
		{
			id: "matching",
			name: "Word Matching",
			desc: "Match translations and improve your memory speed.",
			icon: "🔤",
		},
	];

	const handleSelect = (id) => {
		setSelectedType(id);
		localStorage.setItem("wordvault_learningType", id);
	};

	return (
		<section className="learningType-section">
			<h2 className="learningType-title">Choose What You Want To Play</h2>

			<div className="learningType-grid">
				{types.map((type) => (
					<div
						key={type.id}
						className={`learningType-card ${selectedType === type.id ? "selected" : ""}`}
						onClick={() => handleSelect(type.id)}
					>
						<div className="icon">{type.icon}</div>
						<h3>{type.name}</h3>
						<p>{type.desc}</p>
					</div>
				))}
			</div>

			<div className="btn-bottom">
				<MainButton text="Prev" onClick={prevStep}></MainButton>
				<MainButton text="Next" onClick={nextStep} disabled={!selectedType}></MainButton>
			</div>
		</section>
	);
}

export default LearningType;

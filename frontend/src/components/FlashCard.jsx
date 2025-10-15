import React, { useState } from "react";
import "../styles/global.css";
import "../styles/flashCards.css";

function FlashCard({ frontText, backText }) {
	const [isFlipped, setIsFlipped] = useState(false);

	function flipCard() {
		setIsFlipped((prev) => !prev);
	}

	return (
		<article className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
			<div onClick={flipCard} className="front">
				{frontText}
			</div>
			<div onClick={flipCard} className="back">
				{backText}
			</div>
		</article>
	);
}

export default FlashCard;

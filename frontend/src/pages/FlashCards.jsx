import React, { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/components.css";
import "../styles/flashCards.css";
import MainButton from "../components/MainButton";
import { useLocation, useNavigate } from "react-router-dom";
import { getWords } from "../api/words";
import shuffle from "../utils/shuffle";
import FlashCard from "../components/FlashCard";

function FlashCards() {
	const [flashcards, setFlashcards] = useState([]);
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

	let location = useLocation();
	const { category, fromLang, toLang } = location.state || {};

	const fromLangSafe = fromLang || localStorage.getItem("wordvault_fromLang");
	const toLangSafe = toLang || localStorage.getItem("wordvault_toLang");

	let navigateTo = useNavigate();

	useEffect(() => {
		if (!category || !fromLangSafe || !toLangSafe) return;

		const fetchWords = async () => {
			try {
				const data = await getWords(category, fromLangSafe, toLangSafe);

				const generateFlashcards = data.map((word, index) => ({
					id: word.id,
					from: word.from,
					to: word.to,
				}));

				setFlashcards(shuffle(generateFlashcards));
			} catch (error) {
				console.error("Error fetching words:", error);
			}
		};

		fetchWords();
	}, [category, fromLangSafe, toLangSafe]);

	function handlePrev() {
		if (currentSlideIndex > 0) {
			setCurrentSlideIndex(currentSlideIndex - 1);
		}
	}

	function handleNext() {
		if (currentSlideIndex < flashcards.length - 1) {
			setCurrentSlideIndex(currentSlideIndex + 1);
		} else {
			navigateTo("/");
		}
	}

	if (flashcards.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<section className="flashcards-section">
			<header>
				<span
					className="back"
					onClick={() => {
						navigateTo("/");
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="20"
						height="20"
						fill="currentColor"
					>
						<path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
					</svg>
				</span>
				<h2>Flash Cards</h2>
				<div className="progress">
					{currentSlideIndex + 1} / {flashcards.length}
				</div>
			</header>
			<div className="flashcards-container">
				{flashcards.length === 0 ? (
					<div>Loading...</div>
				) : (
					<FlashCard
						frontText={flashcards[currentSlideIndex].from}
						backText={flashcards[currentSlideIndex].to}
					></FlashCard>
				)}
			</div>

			<div className="btn-bottom">
				<MainButton text="Prev" onClick={handlePrev} disabled={currentSlideIndex === 0} />
				<MainButton text={currentSlideIndex === flashcards.length - 1 ? "End" : "Next"} onClick={handleNext} />
			</div>
		</section>
	);
}

export default FlashCards;

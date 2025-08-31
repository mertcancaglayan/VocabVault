import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/quiz.css";
import "../styles/components.css";
import MainButton from "../components/MainButton";
import { getWords } from "../api/words";
import shuffle from "../utils/shuffle";

function Quiz() {
	const [words, setWords] = useState([]);
	const [slides, setSlides] = useState([]);
	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const [answers, setAnswers] = useState({});

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
				setWords(data);
			} catch (error) {
				console.error("Error fetching words:", error);
			}
		};

		fetchWords();
	}, [category, fromLangSafe, toLangSafe]);

	useEffect(() => {
		if (words.length === 0) return;

		const newSlides = shuffle(words.slice(0, 5)).map((wordObj) => {
			const options = shuffle([wordObj.to, ...wordObj.wrongWords]);
			return { question: wordObj.from, answers: options, correct: wordObj.to };
		});

		setSlides(newSlides);
	}, [words]);

	function handleAnswer(answer, slideIndex) {
		const slide = slides[slideIndex];
		const isCorrect = answer === slide.correct;

		setAnswers((prev) => ({
			...prev,
			[slideIndex]: { answer, isCorrect },
		}));
	}

	function handlePrev() {
		if (currentSlideIndex > 0) {
			setCurrentSlideIndex(currentSlideIndex - 1);
		}
	}

	function handleNext() {
		if (currentSlideIndex < slides.length - 1) {
			setCurrentSlideIndex(currentSlideIndex + 1);
		} else {
			navigateTo("./");
		}
	}

	if (slides.length === 0) {
		return <div>Loading...</div>;
	}

	const currentSlide = slides[currentSlideIndex];

	return (
		<section className="quiz-section">
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
				<h2>Match the Word: {category}</h2>
				<div className="progress">
					{currentSlideIndex + 1} / {slides.length}
				</div>
			</header>

			<article className="quiz-container">
				<div className="quiz-slider">
					<div className="slide">
						<h3 className="word-to-translate">{currentSlide.question}</h3>

						<ul className="options">
							{currentSlide.answers.map((answer, answerIdx) => {
								const slideAnswer = answers[currentSlideIndex];
								const isSelected = slideAnswer?.answer === answer;
								const isCorrect = answer === currentSlide.correct;
								const showResult = slideAnswer !== undefined;

								let buttonClass = "btn";
								if (showResult) {
									if (isSelected) {
										buttonClass += isCorrect ? " correct" : " wrong";
									} else if (isCorrect) {
										buttonClass += " correct";
									}
								}

								return (
									<li key={answerIdx}>
										<button
											type="button"
											className={buttonClass}
											onClick={() => handleAnswer(answer, currentSlideIndex)}
											disabled={showResult}
										>
											{answer}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
				</div>

				<div className="btn-bottom">
					<MainButton text="Prev" onClick={handlePrev} disabled={currentSlideIndex === 0} />
					{currentSlideIndex === slides.length - 1 ? (
						<MainButton
							text="End"
							onClick={() => {
								navigateTo("/quiz/result", { state: { answers, slides } });
							}}
						/>
					) : (
						<MainButton text="Next" onClick={handleNext} disabled={!answers[currentSlideIndex]} />
					)}
				</div>
			</article>
		</section>
	);
}

export default Quiz;

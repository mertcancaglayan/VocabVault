import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/quiz.css";
import MainButton from "../components/MainButton";
import { getWords } from "../api/words";

function Quiz() {
	const [words, setWords] = useState([]);

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
		console.log(words);
	}, [category, fromLangSafe, toLangSafe]);

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
			</header>

			<div className="quiz-slider"></div>
			<div className="btn-bottom">
				<MainButton text="Prev" />
				<MainButton text="Next" disabled={!category} />
			</div>
		</section>
	);
}

export default Quiz;

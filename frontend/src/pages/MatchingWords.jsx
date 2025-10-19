import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWords } from "../api/words";
import shuffle from "../utils/shuffle";
import "../styles/matchingGame.css";

function MatchingWords() {
	const [leftWords, setLeftWords] = useState([]);
	const [rightWords, setRightWords] = useState([]);
	const [selectedLeft, setSelectedLeft] = useState();
	const [selectedRight, setSelectedRight] = useState();

	const [matchedWords, setMatchedWords] = useState([]);

	const location = useLocation();
	const navigate = useNavigate();
	const { category, fromLang, toLang } = location.state || {};

	const fromLangSafe = fromLang || localStorage.getItem("wordvault_fromLang");
	const toLangSafe = toLang || localStorage.getItem("wordvault_toLang");

	const MAXED_MATCH = 6;

	useEffect(() => {
		if (!category || !fromLangSafe || !toLangSafe) return;

		const fetchWords = async () => {
			try {
				const data = await getWords(category, fromLangSafe, toLangSafe);
				const selected = shuffle([...data])
					.slice(0, MAXED_MATCH)
					.map((word) => ({
						id: word.id,
						from: word.from,
						to: word.to,
					}));

				setLeftWords(shuffle([...selected]));
				setRightWords(shuffle([...selected]));
			} catch (error) {
				console.error("Error fetching words:", error);
			}
		};

		fetchWords();
	}, [category, fromLangSafe, toLangSafe]);

	useEffect(() => {
		if (selectedLeft && selectedRight && selectedLeft === selectedRight) {
			setMatchedWords((prev) => [...prev, selectedLeft]);
			setSelectedLeft("");
			setSelectedRight("");
		} else if (selectedLeft && selectedRight && selectedLeft !== selectedRight) {
			setTimeout(() => {
				setSelectedLeft("");
				setSelectedRight("");
			}, 500);
		}
	}, [selectedLeft, selectedRight]);

	useEffect(() => {
		console.log(matchedWords);
	}, [matchedWords]);

	return (
		<section>
			<header>
				<span className="back" onClick={() => navigate("/")}>
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
			</header>
			{matchedWords.length !== MAXED_MATCH ? <div className="game-container">
				<aside className="word-column">
					{leftWords.map((word) => (
						<button
							onClick={() => setSelectedLeft(word.id)}
							key={`from-${word.id}`}
							word-id={word.id}
							className={`btn ${matchedWords.includes(word.id) ? "matched" : ""} ${
								selectedLeft === word.id ? "selected" : ""
							}`}
							disabled={matchedWords.includes(word.id)}
						>
							{word.from}
						</button>
					))}
				</aside>

				<aside className="word-column">
					{rightWords.map((word) => (
						<button
							onClick={() => setSelectedRight(word.id)}
							key={`from-${word.id}`}
							word-id={word.id}
							className={`btn ${matchedWords.includes(word.id) ? "matched" : ""} ${
								selectedRight === word.id ? "selected" : ""
							}`}
							disabled={matchedWords.includes(word.id)}
						>
							{word.to}
						</button>
					))}
				</aside>
			</div> : <div className="game-container">Congrats</div> }
			
		</section>
	);
}

export default MatchingWords;

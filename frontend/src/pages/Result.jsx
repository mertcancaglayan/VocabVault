import { useLocation, useNavigate } from "react-router-dom";
import { getScore } from "../utils/calculateScore";
import MainButton from "../components/MainButton";
import "../styles/result.css";

function Result() {
	const location = useLocation();

	const { answers = {}, slides = [] } = location.state || {};

	const score = getScore(answers);
	const total = slides.length;

	let navigateTo = useNavigate();

	return (
		<section className="result-section">
			<h2>Your Results</h2>
			<p>
				You scored <strong>{score}</strong> out of <strong>{total}</strong>
			</p>

			<ul className="result-list">
				{slides.map((slide, idx) => {
					const userAnswer = answers[idx].answer;
					const isCorrect = answers[idx].isCorrect;

					return (
						<li key={idx} className={isCorrect ? "correct" : "wrong"}>
							<strong>{slide.question}</strong> → Correct: {slide.correct} | Your Answer:{" "}
							{userAnswer || "—"}
						</li>
					);
				})}
			</ul>

			<div className="btn-bottom">
				<MainButton text="Retry" onClick={() => navigateTo("/")} />
				<MainButton text="Home" onClick={() => navigateTo("/")} />
			</div>
		</section>
	);
}

export default Result;

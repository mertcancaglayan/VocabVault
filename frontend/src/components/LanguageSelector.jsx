import React, { useEffect, useState } from "react";
import "../styles/languageSelector.css";
import MainButton from "./MainButton";

function LanguageSelector({ nextStep, prevStep }) {
	const [fromLang, setFromLang] = useState("");
	const [toLang, setToLang] = useState("");

	useEffect(() => {
		console.log(fromLang);
		console.log(toLang);
	}, [fromLang, toLang]);

	return (
		<section className="language-selection">
			<h2>Choose Language Pair</h2>
			<div className="language-selectors">
				<div>
					<label htmlFor="from-lang">From Language</label>
					<select onChange={(e) => setFromLang(e.target.value)} className="btn" id="from-lang">
						<option value="">From Language</option>
						<option value="turkish">Turkish</option>
						<option value="english">English</option>
						<option value="polish">Polish</option>
					</select>
				</div>

				<div>
					<label htmlFor="to-lang">To Language</label>
					<select onChange={(e) => setToLang(e.target.value)} className="btn" id="to-lang">
						<option value="">To Language</option>
						<option value="turkish">Turkish</option>
						<option value="english">English</option>
						<option value="polish">Polish</option>
					</select>
				</div>
			</div>
			<div className="btn-bottom">
				<MainButton text="Prev" onClick={prevStep}></MainButton>
				<MainButton text="Next" onClick={nextStep}></MainButton>
			</div>
		</section>
	);
}

export default LanguageSelector;

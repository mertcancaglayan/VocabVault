import { useEffect, useState } from "react";
import "../styles/home.css";
import "../styles/global.css";
import LanguageSelector from "../components/LanguageSelector";
import CategorySelector from "../components/CategorySelector";
import GreetingsSection from "../components/GreetingsSection";

function Home() {
	const [step, setStep] = useState(() => {
		const validSteps = [0, 1, 2];
		const savedStep = localStorage.getItem("homePageStepVocabvault");

		let parsedStep = null;
		try {
			parsedStep = savedStep !== null ? JSON.parse(savedStep) : null;
		} catch (e) {
			parsedStep = null;
		}

		return validSteps.includes(parsedStep) ? parsedStep : 0;
	});

	useEffect(() => {
		if (step !== null) {
			localStorage.setItem("homePageStepVocabvault", JSON.stringify(step));
		}
	}, [step]);

	const nextStep = () => setStep((e) => e + 1);

	const prevStep = () => setStep((e) => (e > 0 ? e - 1 : 0));
	return (
		<div key={step} className="fade-wrapper">
			<div className="fade">
				{step === 0 && <GreetingsSection nextStep={nextStep} />}

				{step === 1 && <LanguageSelector nextStep={nextStep} prevStep={prevStep} />}
				{step === 2 && <CategorySelector prevStep={prevStep} />}
			</div>
		</div>
	);
}

export default Home;

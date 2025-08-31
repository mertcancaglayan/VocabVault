import { useState } from "react";
import "../styles/home.css";
import "../styles/global.css";
import LanguageSelector from "../components/LanguageSelector";
import CategorySelector from "../components/CategorySelector";
import GreetingsSection from "../components/GreetingsSection";

function Home() {
	const [step, setStep] = useState(0);

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

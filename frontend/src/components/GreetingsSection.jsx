import { getRandomGreetings } from "../data/greetings";
import MainButton from "./MainButton";

function GreetingsSection({ nextStep }) {
	const greeting = getRandomGreetings();

	return (
		<section className="greetings-section">
			<picture>
				<img src="/images/mainPageImg.png" alt="Ana sayfa için görsel" />
			</picture>
			<h2>{greeting}</h2>
			<div className="btn-bottom">
				<MainButton text="Let's Start" onClick={nextStep}></MainButton>
			</div>
		</section>
	);
}

export default GreetingsSection;

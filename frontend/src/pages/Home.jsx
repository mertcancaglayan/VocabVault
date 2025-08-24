import React from "react";
import MainButton from "../components/MainButton";
import "../styles/home.css";
import { getRandomGreetings } from "../data/greetings";

function Home() {
	const greeting = getRandomGreetings();
	return (
		<section>
			<picture>
				<img src="/images/mainPageImg.png" alt="Ana sayfa için görsel" />
			</picture>
			<p>{greeting}</p>
			<div className="btn-bottom">
				<MainButton text="Let's Start"></MainButton>
			</div>
		</section>
	);
}

export default Home;

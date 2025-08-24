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
			<MainButton text="Let's Start"></MainButton>
		</section>
	);
}

export default Home;

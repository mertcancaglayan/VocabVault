import React from "react";
import { useNavigate } from "react-router-dom";

function MatchingWords() {
	let navigateTo = useNavigate();

	return (
		<>
			{" "}
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
				<h2>Under Development</h2>
			</header>
		</>
	);
}

export default MatchingWords;

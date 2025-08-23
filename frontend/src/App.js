import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [words, setWords] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:5000/api/categories/nature").then((res) => {
			setWords(res.data);
			console.log(res.data);
		});
	}, []);

	return (
		<div>
			{words.map((w) => (
				<div key={w.id}>{w.translation}</div>
			))}
		</div>
	);
}

export default App;

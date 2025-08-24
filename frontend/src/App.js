// import { useEffect, useState } from "react";
// import axios from "axios";

import LanguageSelector from "./components/LanguageSelector.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	// const [words, setWords] = useState([]);

	// useEffect(() => {
	// 	axios.get("http://localhost:5000/api/categories/nature").then((res) => {
	// 		setWords(res.data);
	// 		console.log(res.data);
	// 	});
	// }, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/about" element={<Quiz />} />
				 */}
				<Route path="/a" element={<LanguageSelector />} />

			</Routes>
		</BrowserRouter>
	);
}

export default App;

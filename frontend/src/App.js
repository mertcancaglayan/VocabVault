import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";
import FlashCards from "./pages/FlashCards.jsx";
import MatchingWords from "./pages/MatchingWords.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/about" element={<Quiz />} />
				 */}
				<Route path="/quiz/quiz" element={<Quiz />}></Route>
				<Route path="/quiz/flashcards" element={<FlashCards />}></Route>
				<Route path="/quiz/matching" element={<MatchingWords />}></Route>
				<Route path="/quiz/result" element={<Result />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

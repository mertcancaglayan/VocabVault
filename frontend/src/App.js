import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/about" element={<Quiz />} />
				 */}
				<Route path="/quiz/category" element={<Quiz />}></Route>
				<Route path="/quiz/result" element={<Result />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

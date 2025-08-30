import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz.jsx";

function App() {


	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/about" element={<Quiz />} />
				 */}
				<Route path="/quiz/category" element={<Quiz />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

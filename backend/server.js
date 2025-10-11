import express from "express";
import wordsRoute from "./src/routes/wordsRoutes.js";
import categoriesRoute from "./src/routes/categoriesRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(cors({ origin: "http://localhost:3000", methods: ["GET"], credentials: true }));
app.use(express.json());

app.use("/api/v1/words", wordsRoute);
app.use("/api/v1/categories", categoriesRoute);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

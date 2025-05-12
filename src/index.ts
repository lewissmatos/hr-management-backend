import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./db-source";
import { config } from "dotenv";
import proficiencyRouter from "./routes/proficiency.routes";
import authRouter from "./routes/auth.routes";
import languageRouter from "./routes/language.routes";
import jobPositionRouter from "./routes/job-position.routes";

config();

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
		credentials: true,
		methods: "*",
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

// Routes
app.use("/api/proficiencies", proficiencyRouter);
app.use("/api/auth", authRouter);
app.use("/api/languages", languageRouter);
app.use("/api/job-positions", jobPositionRouter);

AppDataSource.initialize()
	.then(() => {
		let appPort = process.env.APP_PORT || 8001;
		app.listen(appPort, () => {
			console.log(`Server is running on port ${appPort}`);
		});
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", err);
	});

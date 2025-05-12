import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./db-source";
import { config } from "dotenv";
import authRouter from "./routes/auth.routes";
import languageRouter from "./routes/language.routes";
import candidateRouter from "./routes/candidate.routes";
import employeeRouter from "./routes/employee.routes";
import jobPositionRouter from "./routes/job-position.routes";
import proficiencyRouter from "./routes/proficiency.routes";
import trainingRouter from "./routes/training.routes";

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
app.use("/api/auth", authRouter);
app.use("/api/candidates", candidateRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/job-positions", jobPositionRouter);
app.use("/api/languages", languageRouter);
app.use("/api/proficiencies", proficiencyRouter);
app.use("/api/trainings", trainingRouter);

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

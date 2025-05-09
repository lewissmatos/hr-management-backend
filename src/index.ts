import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./db-source";
import { config } from "dotenv";
import proficiencyRouter from "./routes/proficiency.routes";
config();

const app = express();
app.use(express.json());
app.use("/api/proficiencies", proficiencyRouter);
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

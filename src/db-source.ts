// src/data-source.ts
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { Proficiency } from "./entities/proficiency.entity";
import { JobPosition } from "./entities/job-position.entity";
import { Language } from "./entities/language.entity";
import { WorkExperience } from "./entities/work-experience.entity";
import { Training } from "./entities/training.entity";
import { Candidate } from "./entities/candidate.entity";
import { Employee } from "./entities/employee.entity";
import { User } from "./entities/user.entity";
config();
export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	synchronize: true,
	ssl: true,
	entities: ["src/entities/**/*.ts"],
	migrations: ["src/migrations/**/*.ts"],
	// migrations: [],
	// subscribers: [],
});

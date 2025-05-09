// services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db-source";
import { User } from "../entities/user.entity";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export class AuthService {
	static async register(username: string, password: string) {
		const repo = AppDataSource.getRepository(User);

		const existing = await repo.findOneBy({ username });
		if (existing) throw new Error("User already exists");

		const hashedPass = await bcrypt.hash(password, 10);
		const user = repo.create({ username, password: hashedPass });
		await repo.save(user);

		return user;
	}

	static async login(username: string, password: string) {
		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOneBy({ username });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error("Invalid credentials");
		}

		const token = jwt.sign(
			{ id: user.id, username },
			JWT_SECRET
			// {
			// 	expiresIn: "1h",
			// }
		);

		return { token };
	}
}

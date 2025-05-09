// services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../db-source";
import { User } from "../entities/user.entity";
import { Employee } from "../entities/employee.entity";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export class AuthService {
	static async register(cedula: string, password: string) {
		const repo = AppDataSource.getRepository(User);
		const employeeRepo = AppDataSource.getRepository(Employee);

		const existing = await repo.findOneBy({ employeeData: { cedula } });
		if (existing) throw new Error("User already exists");

		const hashedPass = await bcrypt.hash(password, 10);
		const employeeData = await employeeRepo.findOneBy({ cedula });
		if (!employeeData) {
			throw new Error("Employee data not found");
		}
		const user = repo.create({ employeeData, password: hashedPass });
		await repo.save(user);

		return { id: user.id, employeeData: user.employeeData };
	}

	static async login(cedula: string, password: string) {
		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOneBy({ employeeData: { cedula } });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error("Invalid credentials");
		}

		const token = jwt.sign(
			{ id: user.id, cedula: user.employeeData.cedula },
			JWT_SECRET
			// {
			// 	expiresIn: "1h",
			// }
		);

		return { token };
	}
}

import { Request, Response } from "express";
import { ProficiencyService } from "../services/proficiency.service";
import { createResponse } from "../utils/responseModel";
import { AuthService } from "../services/auth.service";

export class AuthController {
	static async login(req: Request, res: Response) {
		const { cedula, password } = req.body;
		try {
			const data = await AuthService.login(cedula, password);
			res.json(createResponse(data, "Login successful", 200));
		} catch (e: any) {
			res
				.status(401)
				.json(createResponse(null, e.message || "Unauthorized", 401));
		}
	}
	static async register(req: Request, res: Response) {
		const { cedula, password } = req.body;
		try {
			const data = await AuthService.register(cedula, password);
			res
				.status(201)
				.json(createResponse(data, "User created successfully", 201));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(null, e.message || "Bad request", 400));
		}
	}
}

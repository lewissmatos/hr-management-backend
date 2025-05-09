import { Request, Response } from "express";
import { LanguageService } from "../services/language.service";
import { createResponse } from "../utils/responseModel";

export class LanguageController {
	static async getAll(req: Request, res: Response) {
		try {
			const data = await LanguageService.getAll();
			res.json(createResponse(data, "Languages retrieved successfully", 200));
		} catch (e: any) {
			res
				.status(500)
				.json(createResponse(null, e.message || "Internal server error", 500));
		}
	}

	static async getOne(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await LanguageService.getOne(Number(id));
			res.json(createResponse(data, "Language retrieved successfully", 200));
		} catch (e: any) {
			res
				.status(404)
				.json(createResponse(null, e.message || "Language not found", 404));
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const data = await LanguageService.create(req.body);
			res
				.status(201)
				.json(createResponse(data, "Language created successfully", 201));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(null, e.message || "Bad request", 400));
		}
	}
}

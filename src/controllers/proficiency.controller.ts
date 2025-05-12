// controllers/proficiency.controller.ts
import { Request, Response } from "express";
import { ProficiencyService } from "../services/proficiency.service";
import { createResponse } from "../utils/responseModel";

export class ProficiencyController {
	static async getAll(req: Request, res: Response) {
		const data = await ProficiencyService.getAll();
		res.json(createResponse(data, "Proficiencies fetched successfully", 200));
	}

	static async getOne(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.getOne(Number(req.params.id));
			res.json(createResponse(data, "Proficiency found", 200));
		} catch (e: any) {
			res.status(404).json(createResponse(null, e.message || "Not found", 404));
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.create(req.body);
			res.status(201).json(createResponse(data, "Proficiency created", 201));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(null, e.message || "Bad request", 400));
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse(data, "Proficiency updated", 200));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(null, e.message || "Bad request", 400));
		}
	}

	static async toggleStatus(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.toggleStatus(Number(req.params.id));
			res.json(createResponse(data, "Proficiency deleted", 200));
		} catch (e: any) {
			res.status(404).json(createResponse(null, e.message || "Not found", 404));
		}
	}
}

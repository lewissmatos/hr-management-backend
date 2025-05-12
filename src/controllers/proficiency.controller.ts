// controllers/proficiency.controller.ts
import { Request, Response } from "express";
import { ProficiencyService } from "../services/proficiency.service";
import { createResponse } from "../utils/responseModel";

export class ProficiencyController {
	static async getAll(req: Request, res: Response) {
		const { page, limit } = req.query;
		const paginatedRes = await ProficiencyService.getAll({
			page: Number(page),
			limit: Number(limit),
		});
		res.json(
			createResponse(
				"Proficiencies fetched successfully",
				200,
				paginatedRes.data,
				{
					page: paginatedRes.page,
					limit: paginatedRes.limit,
					total: paginatedRes.total,
				}
			)
		);
	}

	static async getOne(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.getOne(Number(req.params.id));
			res.json(createResponse("Proficiency found", 200, data));
		} catch (e: any) {
			res.status(404).json(createResponse(e.message || "Not found", 404));
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.create(req.body);
			res.status(201).json(createResponse("Proficiency created", 201, data));
		} catch (e: any) {
			res.status(400).json(createResponse(e.message || "Bad request", 400));
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse("Proficiency updated", 200, data));
		} catch (e: any) {
			res.status(400).json(createResponse(e.message || "Bad request", 400));
		}
	}

	static async toggleStatus(req: Request, res: Response) {
		try {
			const data = await ProficiencyService.toggleStatus(Number(req.params.id));
			res.json(createResponse("Proficiency deleted", 200, data));
		} catch (e: any) {
			res.status(404).json(createResponse(e.message || "Not found", 404));
		}
	}
}

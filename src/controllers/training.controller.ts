// controllers/proficiency.controller.ts
import { Request, Response } from "express";
import { TrainingService } from "../services/training.service";
import { createResponse } from "../utils/responseModel";

export class TrainingController {
	static async getAll(req: Request, res: Response) {
		const { page, limit } = req.query;
		const paginatedResponse = await TrainingService.getAll({
			page: Number(page),
			limit: Number(limit),
		});
		res.json(
			createResponse(
				"Proficiencies fetched successfully",
				200,
				paginatedResponse.data,
				{
					page: paginatedResponse.page,
					limit: paginatedResponse.limit,
					total: paginatedResponse.total,
				}
			)
		);
	}

	static async getOne(req: Request, res: Response) {
		try {
			const data = await TrainingService.getOne(Number(req.params.id));
			res.json(createResponse("Training found", 200, data));
		} catch (e: any) {
			res.status(404).json(createResponse(e.message || "Not found", 404));
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const data = await TrainingService.create(req.body);
			res.status(201).json(createResponse("Training created", 201, data));
		} catch (e: any) {
			res.status(400).json(createResponse(e.message || "Bad request", 400));
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await TrainingService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse("Training updated", 200, data));
		} catch (e: any) {
			res.status(400).json(createResponse(e.message || "Bad request", 400));
		}
	}

	static async disable(req: Request, res: Response) {
		try {
			const data = await TrainingService.disable(Number(req.params.id));
			res.json(createResponse("Training deleted", 200, data));
		} catch (e: any) {
			res.status(404).json(createResponse(e.message || "Not found", 404));
		}
	}
}

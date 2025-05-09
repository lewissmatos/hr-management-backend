// controllers/proficiency.controller.ts
import { Request, Response } from "express";
import { TrainingService } from "../services/training.service";
import { createResponse } from "../utils/responseModel";

export class TrainingController {
	static async getAll(req: Request, res: Response) {
		const data = await TrainingService.getAll();
		res.json(createResponse(data, "Proficiencies fetched successfully", 200));
	}

	static async getOne(req: Request, res: Response) {
		try {
			const data = await TrainingService.getOne(Number(req.params.id));
			res.json(createResponse(data, "Training found", 200));
		} catch (e: any) {
			res.status(404).json(createResponse(null, e.message || "Not found", 404));
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const data = await TrainingService.create(req.body);
			res.status(201).json(createResponse(data, "Training created", 201));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(null, e.message || "Bad request", 400));
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await TrainingService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse(data, "Training updated", 200));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(null, e.message || "Bad request", 400));
		}
	}
}

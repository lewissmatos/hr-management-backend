import { Request, Response } from "express";
import { JobPositionService } from "../services/job-position.service";
import { createResponse } from "../utils/responseModel";

export class JobPositionController {
	static async getAll(req: Request, res: Response) {
		try {
			const { page, limit } = req.query;
			const data = await JobPositionService.getAll({
				page: Number(page),
				limit: Number(limit),
			});
			res.json(
				createResponse(data, "Job positions retrieved successfully", 200)
			);
		} catch (e: any) {
			res
				.status(500)
				.json(createResponse(null, e.message || "Internal server error", 500));
		}
	}

	static async getAvailable(req: Request, res: Response) {
		try {
			const { page, limit } = req.query;
			const data = await JobPositionService.getAvailable({
				page: Number(page),
				limit: Number(limit),
			});
			res.json(
				createResponse(
					data,
					"Available job positions retrieved successfully",
					200
				)
			);
		} catch (e: any) {
			res
				.status(500)
				.json(createResponse(null, e.message || "Internal server error", 500));
		}
	}
	static async getOne(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await JobPositionService.getOne(Number(id));
			res.json(
				createResponse(data, "Job position retrieved successfully", 200)
			);
		} catch (e: any) {
			res
				.status(404)
				.json(createResponse(null, e.message || "Job position not found", 404));
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const data = await JobPositionService.create(req.body);
			res
				.status(201)
				.json(createResponse(data, "Job position created successfully", 201));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(null, e.message || "Bad request", 400));
		}
	}
	static async update(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await JobPositionService.update(Number(id), req.body);
			res.json(createResponse(data, "Job position updated successfully", 200));
		} catch (e: any) {
			res
				.status(404)
				.json(createResponse(null, e.message || "Job position not found", 404));
		}
	}
	static async disable(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await JobPositionService.disable(Number(id));
			res.json(createResponse(null, "Job position deleted successfully", 200));
		} catch (e: any) {
			res
				.status(404)
				.json(createResponse(null, e.message || "Job position not found", 404));
		}
	}
}

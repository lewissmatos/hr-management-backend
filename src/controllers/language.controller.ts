import { Request, Response } from "express";
import { LanguageService } from "../services/language.service";
import { createResponse } from "../utils/responseModel";

export class LanguageController {
	static async getAll(req: Request, res: Response) {
		try {
			const paginatedRes = await LanguageService.getAll({
				page: Number(req.query.page) || 1,
				limit: Number(req.query.limit) || 50,
			});
			res.json(
				createResponse(
					"Languages retrieved successfully",
					200,
					paginatedRes.data,
					{
						page: paginatedRes.page,
						limit: paginatedRes.limit,
						total: paginatedRes.total,
					}
				)
			);
		} catch (e: any) {
			res
				.status(500)
				.json(createResponse(e.message || "Internal server error", 500));
		}
	}

	static async getOne(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await LanguageService.getOne(Number(id));
			res.json(createResponse("Language retrieved successfully", 200, data));
		} catch (e: any) {
			res
				.status(404)
				.json(createResponse(e.message || "Language not found", 404));
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const data = await LanguageService.create(req.body);
			res
				.status(201)
				.json(createResponse("Language created successfully", 201, data));
		} catch (e: any) {
			res.status(400).json(createResponse(e.message || "Bad request", 400));
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await LanguageService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse("Language updated successfully", 200));
		} catch (e: any) {
			res.status(400).json(createResponse(e.message || "Bad request", 400));
		}
	}
}

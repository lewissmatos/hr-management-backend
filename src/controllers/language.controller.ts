import { Request, Response } from "express";
import { LanguageService } from "../services/language.service";
import { createResponse } from "../utils/responseModel";

export class LanguageController {
	static async getAll(req: Request, res: Response) {
		const { page, limit, name, isActive } = req.query;
		try {
			const paginatedRes = await LanguageService.getAll({
				page: Number(page) || 1,
				limit: Number(limit) || 50,
				name: name ? String(name).toLowerCase() : undefined,
				booleanQuery: isActive ? String(isActive) : undefined,
			});
			res.json(
				createResponse(
					"Idiomas obtenidos exitosamente",
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
				.json(createResponse(e.message || "Error interno del servidor", 500));
		}
	}

	static async getOne(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await LanguageService.getOne(Number(id));
			res.json(createResponse("Idioma obtenido exitosamente", 200, data));
		} catch (e: any) {
			res
				.status(404)
				.json(createResponse(e.message || "Idioma no encontrado", 404));
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const data = await LanguageService.create(req.body);
			res
				.status(201)
				.json(createResponse("Idioma creado exitosamente", 201, data));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(e.message || "Solicitud incorrecta", 400));
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await LanguageService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse("Idioma actualizado exitosamente", 200));
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(e.message || "Solicitud incorrecta", 400));
		}
	}

	static async toggleStatus(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await LanguageService.toggleStatus(Number(id));
			res.json(createResponse("Estado del idioma cambiado exitosamente", 200));
		} catch (e: any) {
			res
				.status(404)
				.json(createResponse(e.message || "Idioma no encontrado", 404));
		}
	}
}

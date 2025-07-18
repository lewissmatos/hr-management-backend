import { Request, Response } from "express";
import { JobPositionService } from "../services/job-position.service";
import { createResponse } from "../utils/responseModel";

export class JobPositionController {
	static async getAll(req: Request, res: Response) {
		try {
			const {
				page,
				limit,
				name,
				minSalary,
				maxSalary,
				riskLevels,
				isAvailable,
				description,
			} = req.query;
			const paginatedRes = await JobPositionService.getAll({
				page: Number(page),
				limit: Number(limit),
				name: name ? String(name) : undefined,
				description: description ? String(description) : undefined,
				booleanQuery: isAvailable ? String(isAvailable) : undefined,
				minSalary: minSalary ? Number(minSalary) : undefined,
				maxSalary: maxSalary ? Number(maxSalary) : undefined,
				riskLevels: riskLevels ? String(riskLevels).split(",") : undefined,
			});

			res.json(
				createResponse(
					"Puestos de trabajo obtenidos exitosamente",
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
			const data = await JobPositionService.getOne(Number(id));
			res.json(
				createResponse("Puesto de trabajo obtenido exitosamente", 200, data)
			);
		} catch (e: any) {
			res
				.status(404)
				.json(
					createResponse(e.message || "Puesto de trabajo no encontrado", 404)
				);
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const data = await JobPositionService.create(req.body);
			res
				.status(201)
				.json(
					createResponse("Puesto de trabajo creado exitosamente", 201, data)
				);
		} catch (e: any) {
			res
				.status(400)
				.json(createResponse(e.message || "Solicitud incorrecta", 400));
		}
	}
	static async update(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await JobPositionService.update(Number(id), req.body);
			res.json(
				createResponse("Puesto de trabajo actualizado exitosamente", 200, data)
			);
		} catch (e: any) {
			res
				.status(404)
				.json(
					createResponse(e.message || "Puesto de trabajo no encontrado", 404)
				);
		}
	}
	static async toggleAvailability(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await JobPositionService.toggleAvailability(Number(id));
			res.json(
				createResponse("Puesto de trabajo actualizado exitosamente", 200)
			);
		} catch (e: any) {
			res
				.status(404)
				.json(
					createResponse(e.message || "Puesto de trabajo no encontrado", 404)
				);
		}
	}

	static async getCandidatesCount(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await JobPositionService.getCandidatesCount(Number(id));
			res.json(
				createResponse(
					"Cantidad de candidatos obtenida exitosamente",
					200,
					data
				)
			);
		} catch (e: any) {
			res
				.status(404)
				.json(
					createResponse(e.message || "Puesto de trabajo no encontrado", 404)
				);
		}
	}
}

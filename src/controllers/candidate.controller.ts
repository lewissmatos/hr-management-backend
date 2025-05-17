import { Request, Response } from "express";
import { CandidateService } from "../services/candidate.service";
import { createResponse } from "../utils/responseModel";

export class CandidateController {
	static async getAll(req: Request, res: Response) {
		try {
			const {
				page,
				limit,
				proficiency,
				training,
				language,
				applyingJobPosition,
				searchParam,
				startApplyingDate,
				endApplyingDate,
				startSalary,
				endSalary,
			} = req.query;
			const paginatedRes = await CandidateService.getAll({
				page: Number(page),
				limit: Number(limit),
				proficiencyName: proficiency ? String(proficiency) : undefined,
				trainingName: training ? String(training) : undefined,
				languageName: language ? String(language) : undefined,
				applyingJobPositionName: applyingJobPosition
					? String(applyingJobPosition)
					: undefined,
				searchParam: searchParam
					? String(searchParam).toLowerCase()
					: undefined,
				startApplyingDate: startApplyingDate
					? new Date(String(startApplyingDate))
					: undefined,
				endApplyingDate: endApplyingDate
					? new Date(String(endApplyingDate))
					: undefined,
				startSalary: startSalary ? Number(startSalary) : undefined,
				endSalary: endSalary ? Number(endSalary) : undefined,
			});
			res.json(
				createResponse("Capacitación encontrada", 200, paginatedRes.data, {
					page: paginatedRes.page,
					limit: paginatedRes.limit,
					total: paginatedRes.total,
				})
			);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}

	static async getOne(req: Request, res: Response) {
		try {
			const data = await CandidateService.getOne(Number(req.params.id));
			res.json(createResponse("Candidato encontrado", 200, data));
		} catch (error: any) {
			res.status(404).json({ message: error.message });
		}
	}

	static async getByCedula(req: Request, res: Response) {
		try {
			const data = await CandidateService.getByCedula(
				String(req.params.cedula)
			);
			res.json(createResponse(data.message, 200, data.candidate));
		} catch (error: any) {
			res.status(404).json({ message: error.message });
		}
	}
	static async create(req: Request, res: Response) {
		try {
			const data = await CandidateService.create(req.body);
			res.status(201).json(createResponse("Candidato creado", 201, data));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async checkPassword(req: Request, res: Response) {
		try {
			const data = await CandidateService.checkPassword(
				req.body.cedula,
				req.body.password
			);
			res.status(201).json(createResponse("Contraseña revisada", 200, data));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
	static async update(req: Request, res: Response) {
		try {
			const data = await CandidateService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse("Candidato actualizado", 200, data));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async makeEmployee(req: Request, res: Response) {
		try {
			const data = await CandidateService.makeEmployee(
				Number(req.params.id),
				Number(req.body.salary)
			);
			res.json(createResponse("Candidato convertido en empleado", 200, data));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}

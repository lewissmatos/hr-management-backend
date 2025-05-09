import { Request, Response } from "express";
import { CandidateService } from "../services/candidate.service";
import { createResponse } from "../utils/responseModel";

export class CandidateController {
	static async getAll(req: Request, res: Response) {
		try {
			const { page, limit } = req.query;
			const data = await CandidateService.getAll({
				page: Number(page),
				limit: Number(limit),
			});
			res.json(createResponse(data, "Training found", 200));
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}

	static async getOne(req: Request, res: Response) {
		try {
			const data = await CandidateService.getOne(Number(req.params.id));
			res.json(createResponse(data, "Candidate found", 200));
		} catch (error: any) {
			res.status(404).json({ message: error.message });
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await CandidateService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse(data, "Candidate updated", 200));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async makeEmployee(req: Request, res: Response) {
		try {
			const data = await CandidateService.makeEmployee(Number(req.params.id));
			res.json(createResponse(data, "Candidate made employee", 200));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}

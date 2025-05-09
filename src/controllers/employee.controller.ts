import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { createResponse } from "../utils/responseModel";

export class EmployeeController {
	static async getAll(req: Request, res: Response) {
		try {
			const { page, limit } = req.query;
			const data = await EmployeeService.getAll({
				page: Number(page),
				limit: Number(limit),
			});
			res.json(createResponse(data, "Employee found", 200));
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	}

	static async getOne(req: Request, res: Response) {
		try {
			const data = await EmployeeService.getOne(Number(req.params.id));
			res.json(createResponse(data, "Employee found", 200));
		} catch (error: any) {
			res.status(404).json({ message: error.message });
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const data = await EmployeeService.create(req.body);
			res.json(createResponse(data, "Employee created", 201));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const data = await EmployeeService.update(
				Number(req.params.id),
				req.body
			);
			res.json(createResponse(data, "Employee updated", 200));
		} catch (error: any) {
			res.status(400).json({ message: error.message });
		}
	}
}

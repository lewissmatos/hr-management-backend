import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { createResponse } from "../utils/responseModel";

export class EmployeeController {
    static async getAll(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;
            const paginatedRes = await EmployeeService.getAll({
                page: Number(page),
                limit: Number(limit),
            });
            res.json(
                createResponse("Empleado encontrado", 200, paginatedRes.data, {
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
            const data = await EmployeeService.getOne(Number(req.params.id));
            res.json(createResponse("Empleado encontrado", 200, data));
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const data = await EmployeeService.create(req.body);
            res.json(createResponse("Empleado creado", 201, data));
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
            res.json(createResponse("Empleado actualizado", 200, data));
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
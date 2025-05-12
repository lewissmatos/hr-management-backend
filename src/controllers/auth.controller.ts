import { Request, Response } from "express";
import { ProficiencyService } from "../services/proficiency.service";
import { createResponse } from "../utils/responseModel";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async login(req: Request, res: Response) {
        const { cedula, password } = req.body;
        try {
            const data = await AuthService.login(cedula, password);
            res.json(createResponse("Inicio de sesión exitoso", 200, data));
        } catch (e: any) {
            res
                .status(400)
                .json(createResponse(e.message || "No autorizado", 400));
        }
    }
    static async register(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const data = await AuthService.register(username, password);
            res
                .status(201)
                .json(createResponse("Usuario creado exitosamente", 201, data));
        } catch (e: any) {
            res
                .status(400)
                .json(createResponse(e.message || "Solicitud incorrecta", 400));
        }
    }
}
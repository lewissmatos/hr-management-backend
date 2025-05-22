// routes/proficiency.route.ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { EmployeeController } from "../controllers/employee.controller";

const router = Router();
router.get("/", EmployeeController.getAll);
router.use(authenticateJWT);
router.get("/export", EmployeeController.getToExport);
router.get("/:id", EmployeeController.getOne);
router.post("/", EmployeeController.create);
router.put("/:id", EmployeeController.update);

export default router;

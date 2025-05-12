// routes/proficiency.route.ts
import { Router } from "express";
import { ProficiencyController } from "../controllers/proficiency.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", ProficiencyController.getAll);
router.get("/:id", ProficiencyController.getOne);
router.post("/", ProficiencyController.create);
router.put("/:id", ProficiencyController.update);
router.patch("/:id/toggle-status", ProficiencyController.toggleStatus);

export default router;

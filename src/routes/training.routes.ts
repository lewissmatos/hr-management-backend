// routes/proficiency.route.ts
import { Router } from "express";
import { TrainingController } from "../controllers/training.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", TrainingController.getAll);
router.use(authenticateJWT);

router.get("/:id", TrainingController.getOne);
router.post("/", TrainingController.create);
router.put("/:id", TrainingController.update);
router.put("/:id/disable", TrainingController.disable); // TODO: Make this in all routes/controllers/services

export default router;

// routes/proficiency.route.ts
import { Router } from "express";
import { TrainingController } from "../controllers/training.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticateJWT);

router.get("/", TrainingController.getAll);
router.get("/:id", TrainingController.getOne);
router.post("/", TrainingController.create);
router.put("/:id", TrainingController.update);

export default router;

// routes/proficiency.route.ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { JobPositionController } from "../controllers/job-position.controller";

const router = Router();
// router.use(authenticateJWT);

router.get("/", JobPositionController.getAll);
router.get("/:id", JobPositionController.getOne);
router.post("/", JobPositionController.create);
router.put("/:id", JobPositionController.update);
router.put("/:id/disable", JobPositionController.disable);

export default router;

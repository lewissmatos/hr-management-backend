// routes/proficiency.route.ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { JobPositionController } from "../controllers/job-position.controller";

const router = Router();
// router.use(authenticateJWT);

router.get("/:id/candidates-count", JobPositionController.getCandidatesCount);
router.get("/", JobPositionController.getAll);
router.get("/:id", JobPositionController.getOne);
router.post("/", JobPositionController.create);
router.put("/:id", JobPositionController.update);
router.put(
	"/:id/toggle-availability",
	JobPositionController.toggleAvailability
);

export default router;

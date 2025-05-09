// routes/proficiency.route.ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { CandidateController } from "../controllers/candidate.controller";

const router = Router();
router.use(authenticateJWT);

router.get("/", CandidateController.getAll);
router.get("/:id", CandidateController.getOne);
router.put("/:id", CandidateController.update);
router.put("/:id/make-employee", CandidateController.makeEmployee);

export default router;

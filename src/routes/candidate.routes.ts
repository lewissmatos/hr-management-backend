// routes/proficiency.route.ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { CandidateController } from "../controllers/candidate.controller";

const router = Router();
router.get("/:id", CandidateController.getOne);
router.get("/:cedula/cedula", CandidateController.getByCedula);
router.post("/check-password", CandidateController.checkPassword);
router.post("/", CandidateController.create);
router.put("/:id", CandidateController.update);
// router.use(authenticateJWT);
router.get("/", CandidateController.getAll);
router.put("/:id/make-employee", CandidateController.makeEmployee);

export default router;

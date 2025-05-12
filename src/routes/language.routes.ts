// routes/proficiency.route.ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { LanguageController } from "../controllers/language.controller";

const router = Router();
router.get("/", LanguageController.getAll);
router.use(authenticateJWT);
router.get("/:id", LanguageController.getOne);
router.post("/", LanguageController.create);
router.put("/:id", LanguageController.update);
router.patch("/:id/toggle-status", LanguageController.toggleStatus);

export default router;

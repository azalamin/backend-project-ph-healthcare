import { Router } from "express";
import { multerUpload } from "../../../config/multer.config";
import { UserRole } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { SpecialtyController } from "./specialty.controller";
import { SpecialtyValidation } from "./specialty.validation";

const router = Router();

router.post(
	"/",
	// checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	multerUpload.single("file"),
	validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
	SpecialtyController.createSpecialty,
);

router.get("/", SpecialtyController.getAllSpecialties);

router.patch(
	"/:id",
	checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	SpecialtyController.updateSpecialty,
);

router.delete(
	"/:id",
	checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
	SpecialtyController.deleteSpecialty,
);

export const SpecialtyRoutes = router;

import { Router } from "express";
import { UserRole } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { SpecialtyController } from "./specialty.controller";

const router = Router();

router.post(
	"/",
	checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
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

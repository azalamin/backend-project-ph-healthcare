/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response, Router } from "express";
import status from "http-status";
import { envVars } from "../../../config/env";
import { UserRole } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { CookieUtils } from "../../utils/cookie";
import { jwtUtils } from "../../utils/jwt";
import { SpecialtyController } from "./specialty.controller";

const router = Router();

router.post("/", SpecialtyController.createSpecialty);
router.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const accessToken = CookieUtils.getCookie(req, "accessToken");

			if (!accessToken) {
				throw new AppError(status.UNAUTHORIZED, "Unauthorized access! No access token provided.");
			}

			const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);

			if (!verifiedToken.success) {
				throw new AppError(status.UNAUTHORIZED, "Unauthorized access! Invalid access token.");
			}

			if (verifiedToken.data!.role !== UserRole.ADMIN) {
				throw new AppError(
					status.FORBIDDEN,
					"Forbidden access! You do not have permission to access this resource",
				);
			}

			next();
		} catch (error: any) {
			next(error);
		}
	},
	SpecialtyController.getAllSpecialties,
);
router.patch("/:id", SpecialtyController.updateSpecialty);
router.delete("/:id", SpecialtyController.deleteSpecialty);

export const SpecialtyRoutes = router;

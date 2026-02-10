/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (envVars.NODE_ENV === "development") {
		console.log("Error from Global Error Handler", err);
	}

	const statusCode: number = status.INTERNAL_SERVER_ERROR;
	const message: string = "Internal Server Error";

	res.status(statusCode).json({
		success: false,
		message: message,
		error: err.message,
	});
};

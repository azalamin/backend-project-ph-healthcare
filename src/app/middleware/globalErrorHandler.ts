/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import { envVars } from "../../config/env";
import { handleZodError } from "../errorHelpers/handleZodError";
import { IErrorResponse, IErrorSources } from "../interfaces/error.interface";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	if (envVars.NODE_ENV === "development") {
		console.log("Error from Global Error Handler", err);
	}

	let errorSources: IErrorSources[] = [];
	let statusCode: number = status.INTERNAL_SERVER_ERROR;
	let message: string = "Internal Server Error";

	if (err instanceof z.ZodError) {
		const simplifiedError = handleZodError(err);
		statusCode = simplifiedError.statusCode as number;
		message = simplifiedError.message;

		errorSources = [...simplifiedError.errorSources];
	}

	const errorResponse: IErrorResponse = {
		success: false,
		message: message,
		errorSources,
		error: envVars.NODE_ENV === "development" ? err : undefined,
	};

	res.status(statusCode).json(errorResponse);
};

import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
	console.log("file: specialty.controller.ts, line: 11, createSpecialty -> req.body", req.body);
	console.log(req.file);
	const payload = {
		...req.body,
		icon: req.file?.path,
	};

	const result = await SpecialtyService.createSpecialty(payload);
	sendResponse(res, {
		httpStatusCode: 201,
		success: true,
		message: "Specialty created successfully!",
		data: result,
	});
});

const getAllSpecialties = catchAsync(async (_req: Request, res: Response) => {
	const specialties = await SpecialtyService.getAllSpecialties();

	sendResponse(res, {
		httpStatusCode: 200,
		success: true,
		message: "Specialties fetched successfully!",
		data: specialties,
	});
});

const updateSpecialty = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const data = req.body;
	const specialty = await SpecialtyService.updateSpecialty(data, id as string);

	sendResponse(res, {
		httpStatusCode: 200,
		success: true,
		message: "Specialty updated successfully!",
		data: specialty,
	});
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await SpecialtyService.deleteSpecialty(id as string);

	sendResponse(res, {
		httpStatusCode: 200,
		success: true,
		message: "Specialty deleted successfully!",
		data: result,
	});
});

export const SpecialtyController = {
	createSpecialty,
	getAllSpecialties,
	updateSpecialty,
	deleteSpecialty,
};

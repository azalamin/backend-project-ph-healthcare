import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { DoctorService } from "./doctor.service";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
	const result = await DoctorService.getAllDoctors();

	sendResponse(res, {
		httpStatusCode: 200,
		success: true,
		message: "Doctors fetched successfully!",
		data: result,
	});
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;

	const result = await DoctorService.getDoctorById(id as string);

	sendResponse(res, {
		httpStatusCode: 200,
		success: true,
		message: "Doctor fetched successfully!",
		data: result,
	});
});

export const DoctorController = {
	getAllDoctors,
	getDoctorById,
};

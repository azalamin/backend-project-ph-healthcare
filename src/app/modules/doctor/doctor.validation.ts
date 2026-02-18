import z from "zod";

export const updateDoctorZodSchema = z
	.object({
		name: z
			.string("Name is required! & must be string")
			.min(5, "Name must be at least 5 characters")
			.max(50, "Name must be at most 50 characters"),

		profilePhoto: z.url("Profile Photo must be an url"),

		contactNumber: z
			.string("Contact number is required & must be string")
			.min(11, "Contact number must be at least 11 characters")
			.max(14, "Contact number must be at most 14 characters"),

		address: z
			.string("Address is required & must be string")
			.min(10, "Address must be at least 10 characters")
			.max(100, "Address must be at most 100 characters")
			.optional(),

		experience: z.int("Experience must be an integer").nonnegative("Experience cannot be negative"),

		appointmentFee: z
			.number("Appointment fee must be a number")
			.nonnegative("Appointment fee cannot be negative"),
	})
	.partial();

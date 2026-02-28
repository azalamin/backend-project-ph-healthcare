import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import { ONE_DAY } from "../utils/token";
import { prisma } from "./prisma";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),

	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: true,
				defaultValue: UserRole.PATIENT,
			},
			status: {
				type: "string",
				required: true,
				defaultValue: UserStatus.ACTIVE,
			},
			needsPasswordChange: {
				type: "boolean",
				required: true,
				defaultValue: false,
			},
			isDeleted: {
				type: "boolean",
				required: true,
				defaultValue: false,
			},
			deletedAt: {
				type: "date",
				required: false,
				defaultValue: null,
			},
		},
	},

	session: {
		expiresIn: ONE_DAY, // 1 day in MS
		updateAge: ONE_DAY, // 1 day in MS
		cookieCache: {
			enabled: true,
			maxAge: ONE_DAY, // 1 day in MS
		},
	},

	// trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:4000"],

	// advanced: {
	// 	disableCSRFCheck: true,
	// },
});

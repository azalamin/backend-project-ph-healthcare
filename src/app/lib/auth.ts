import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, emailOTP } from "better-auth/plugins";
import { envVars } from "../../config/env";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import { sendEmail } from "../utils/email";
import { prisma } from "./prisma";

export const auth = betterAuth({
	baseURL: envVars.BETTER_AUTH_URL,
	secret: envVars.BETTER_AUTH_SECRET,
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),

	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},

	emailVerification: {
		sendOnSignUp: true,
		sendOnSignIn: true,
		autoSignInAfterVerification: true,
	},

	socialProviders: {
		google: {
			clientId: envVars.GOOGLE_CLIENT_ID,
			clientSecret: envVars.GOOGLE_CLIENT_SECRET,

			mapProfileToUser: () => {
				return {
					role: UserRole.PATIENT,
					status: UserStatus.ACTIVE,
					needsPasswordChange: false,
					emailVerified: true,
					isDeleted: false,
					deletedAt: null,
				};
			},
		},
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

	plugins: [
		bearer(),
		emailOTP({
			overrideDefaultEmailVerification: true,
			async sendVerificationOTP({ email, otp, type }) {
				if (type === "email-verification") {
					const user = await prisma.user.findUnique({
						where: {
							email,
						},
					});

					if (user && !user.emailVerified) {
						sendEmail({
							to: email,
							subject: "Verify your email",
							templateName: "otp",
							templateData: {
								name: user.name,
								otp,
							},
						});
					}
				} else if (type === "forget-password") {
					const user = await prisma.user.findUnique({
						where: {
							email,
						},
					});

					if (user) {
						sendEmail({
							to: email,
							subject: "Password Reset OTP",
							templateName: "otp",
							templateData: {
								name: user.name,
								otp,
							},
						});
					}
				}
			},
			expiresIn: 2 * 60, // 2 minutes in seconds,
			otpLength: 6,
		}),
	],

	session: {
		expiresIn: 60 * 60 * 24, // 1 day in second
		updateAge: 60 * 60 * 24, // 1 day in second
		cookieCache: {
			enabled: true,
			maxAge: 60 * 60 * 24, // 1 day in second
		},
	},

	redirectURLs: {
		signIn: `${envVars.BETTER_AUTH_URL}/api/v1/auth/google/success`,
	},

	trustedOrigins: [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL || "http://localhost:4000"],

	advanced: {
		// disableCSRFCheck: true,
		useSecureCookies: false,
		cookies: {
			state: {
				attributes: {
					sameSite: "none",
					secure: true,
					httpOnly: true,
					path: "/",
				},
			},
			sessionToken: {
				attributes: {
					sameSite: "none",
					secure: true,
					httpOnly: true,
					path: "/",
				},
			},
		},
	},
});

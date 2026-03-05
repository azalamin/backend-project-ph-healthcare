export interface IRegisterPatientPayload {
	name: string;
	email: string;
	password: string;
}

export interface ILoginUserPayload {
	email: string;
	password: string;
}

export interface IChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
}

export interface ISession {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	expiresAt: Date;
	token: string;
	ipAddress?: string;
	userAgent?: string;
}

interface IUser {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	emailVerified: boolean;
	name: string;
	image?: string;
	role: string;
	status: string;
	needsPasswordChange: boolean;
	isDeleted: boolean;
	deletedAt?: Date;
}

export interface IGoogleLoginSuccessResult {
	accessToken: string;
	refreshToken: string;
	sessionToken: string;
	user: IUser;
	session: ISession;
}

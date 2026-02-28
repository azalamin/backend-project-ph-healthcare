import { Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../../config/env";
import { CookieUtils } from "./cookie";
import { jwtUtils } from "./jwt";

const getAccessToken = (payload: JwtPayload) => {
	const accessToken = jwtUtils.createToken(payload, envVars.ACCESS_TOKEN_SECRET, {
		expiresIn: envVars.ACCESS_TOKEN_EXPIRES_IN,
	} as SignOptions);

	return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
	const refreshToken = jwtUtils.createToken(payload, envVars.REFRESH_TOKEN_SECRET, {
		expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
	} as SignOptions);

	return refreshToken;
};

const ONE_DAY = 24 * 60 * 60 * 1000; // 1d in ms
const SEVEN_DAYS = ONE_DAY * 7;

const setAccessTokenCookie = (res: Response, token: string) => {
	CookieUtils.setCookie(res, "accessToken", token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		// 1 day
		maxAge: ONE_DAY,
	});
};

const setRefreshTokenCookie = (res: Response, token: string) => {
	CookieUtils.setCookie(res, "refreshToken", token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		// 7d
		maxAge: SEVEN_DAYS,
	});
};

const setBetterAuthSessionCookie = (res: Response, token: string) => {
	CookieUtils.setCookie(res, "better-auth.session_token", token, {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
		// 1d
		maxAge: ONE_DAY,
	});
};

export const tokenUtils = {
	getAccessToken,
	getRefreshToken,
	setAccessTokenCookie,
	setRefreshTokenCookie,
	setBetterAuthSessionCookie,
};

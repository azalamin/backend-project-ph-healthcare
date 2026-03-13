import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import { auth } from "./app/lib/auth";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { IndexRoutes } from "./app/routes";
import { envVars } from "./config/env";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(
	cors({
		origin: [
			envVars.FRONTEND_URL,
			envVars.BETTER_AUTH_URL,
			"http://localhost:3000",
			"http://localhost:4000",
		],
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.use("/api/auth", toNodeHandler(auth));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", IndexRoutes);

// Basic route
app.get("/", async (req: Request, res: Response) => {
	res.send({
		success: true,
		message: "Welcome to PH Healthcare server",
	});
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

import app from "./app";

const bootstrap = () => {
	try {
		app.listen(4000, () => {
			console.log(`Server is running on http://localhost:${4000}`);
		});
	} catch (error) {
		console.error("Failed to start server: ", error);
	}
};

bootstrap();

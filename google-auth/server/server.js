require("dotenv").config();
import express from "express";
import cors from "cors";
import { initialize, session } from "passport";
import authRoute from "./routes/auth";
import cookieSession from "cookie-session";
import passportStrategy from "./passport";
const app = express();

app.use(
	cookieSession({
		name: "session",
		keys: ["bridge"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(initialize());
app.use(session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
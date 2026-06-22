import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "middlewares/errorHandler";
// create express server
const app = express();

//security middleware
app.use(helmet());

//body parsing middleware
app.use(compression());
app.use(express.json({ limit: "800kb" }));
app.use(express.urlencoded({ extended: true, limit: "800kb" }));
app.use(cookieParser());

//initialize routes
app.use("/api", routes);

//global error handler
app.use(errorHandler);

export { app };

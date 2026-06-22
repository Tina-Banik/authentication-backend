import { Request, Response, NextFunction } from "express";
import { ApiError } from "../shared/exceptions/ApiError";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import config from "../configs/env.config";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ??
      (error instanceof PrismaClientKnownRequestError ? 400 : 500);

    const message = error.message || "Internal server error";

    error = new ApiError(error.message || "Internal server error", statusCode);
  }

  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        error = new ApiError("Resource already exists", 400);
        break;
      case "P2025":
        error = new ApiError("Resource not found", 404);
        break;
      case "P2003":
        error = new ApiError("Invalid Foreign key constraint", 400);
        break;
      default:
        error = new ApiError("Database operation failed", 400);
        break;
    }
  }

  //handle prisma validations error
  if (error instanceof PrismaClientValidationError) {
    error = new ApiError("Invalid data provided", 400);
  }

  // log error in development
  if (config.NODE_ENV === "development") {
    console.error(error);
  }

  const response = {
    success: false,
    message: error.message,
    ...(config.NODE_ENV === "development" && { stack: error.stack }),
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
  };

  res.status(error.statusCode).json(response);
};

export { errorHandler };

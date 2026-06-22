import express from "express";
import config from "./configs/env.config";

import { apiLimiter } from "./middlewares/rateLimiter";
const app = express();

// Rate limiting globally
app.use("/api", apiLimiter);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: "true",
    message: "API is running",
    version: "1.0.0",
    documentation: "/api/v1/health",
  });
});

//404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// gracefully shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  process.exit(0);
});

// start server
app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on port ${config.PORT}`);
  console.log(`📱 Environment: ${config.NODE_ENV}`);
  console.log(`🌐 URL: http://localhost:${config.PORT}${config.API_URL}`);
});

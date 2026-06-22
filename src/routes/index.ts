import { Router } from "express";
import authRoutes from "../modules/auth/auth.route";
import V1Routes from "./v1";
import { prisma } from "configs/database";

const router = Router();

/***
 * health check
 * GET  http://localhost:4000/api/health
 */

router.get("/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      database: "failed",
    });
  }
});

/**versions 
 * api
 */
router.use("/v1", V1Routes);
export default router;
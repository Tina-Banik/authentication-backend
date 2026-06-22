import { Router } from "express";
import authRoutes from "../../modules/auth/auth.route";

const router = Router();

export const routes = [{ path: "/auth", handler: authRoutes }] as const;

routes.forEach(({ path, handler }) => router.use(path, handler));

export default router;

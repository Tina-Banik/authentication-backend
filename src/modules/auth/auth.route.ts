import * as registerController  from "../../modules/auth/auth.controller";
import { Router } from "express";
import { registerSchema } from "./auth.validator";
import { validate } from "../../models/validate";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  registerController.userRegister,
);

export default router;

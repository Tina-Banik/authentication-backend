import { ApiResponse } from "shared/utils/ApiResponse";
import { catchAsync } from "../../shared/utils/catchAsync";
import { RegisterUserInput } from "./auth.validator";
import * as registerService from "../auth/auth.services";
import { Request, Response } from "express";

export const userRegister = catchAsync(async (req: Request, res: Response) => {
  const data = req.body as RegisterUserInput;
  const user = await registerService.register(data);

  return res.status(201).json({
    status: "success",
    data: user,
  });
});

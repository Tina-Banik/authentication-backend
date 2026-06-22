import { UserRole } from "@prisma/client";
import { z } from "zod";

const userBaseSchema = z.object({
  fullName: z
    .string()
    .min(4, "First name must at least")
    .max(50, "First name must at most 50 characters long"),

  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Passwords must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Passwords must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special characters",
    ),
  mobileNumber: z
    .string()
    .regex(/^[+]?[1-9]\d{1,14}$/, "Phone number starts with the +91")
    .min(10)
    .max(15),
  storeName: z.string().min(4).max(100),
  legalBusinessName: z.string().min(4).max(200),
  businessType: z.string().min(2).max(50),
});

export const registerSchema = z.object({
  body: userBaseSchema
    .extend({
      role: z.enum(Object.values(UserRole) as [string, ...string[]]),
      confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "password do not match",
      path: ["confirmPassword"],
    }),
});


export type RegisterUserInput = z.infer<typeof registerSchema>["body"]
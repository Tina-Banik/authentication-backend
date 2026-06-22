import { hashPassword } from "../../shared/utils/password";
import { prisma } from "../../configs/database";
import { RegisterUserInput } from "modules/auth/auth.validator";
import { SubscriptionStatus } from "@prisma/client";
import { ConflictError } from "../../shared/exceptions/ApiError";

export const register = async (data: RegisterUserInput) => {
  // if the email exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new ConflictError("Email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const trialStartDate = new Date();
  const trialEndDate = new Date(trialStartDate);
  trialEndDate.setDate(trialEndDate.getDate() + 7);

  const result = await prisma.$transaction(async (tx: any) => {
    const tenant = await tx.tenant.create({
      data: {
        storeName: data.storeName,
        legalBusinessName: data.legalBusinessName,
        businessType: data.businessType,
        trialStartDate,
        trialEndDate,
        subscriptionStatus: "TRIAL",
        tenantStatus: "ACTIVE",
      },
    });

    const user = await tx.user.create({
      data: {
        tenantId: tenant.id,
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        passwordHash: hashedPassword,
        role: "TENANT_ADMIN",
        isEmailVerified: false,
      },
    });

    return { tenant, user };
  });
  return result;
};

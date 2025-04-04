import { z } from "zod";

export const changePasswordValidation = z.object({
  oldPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),

  newPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),

  passwordConfirm: z.string({
    required_error: "Password confirmation is required",
  }),
});

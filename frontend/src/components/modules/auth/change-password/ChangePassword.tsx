"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { changePassword } from "@/services/AuthService";

// ✅ Zod schema
const changePasswordValidation = z
  .object({
    oldPassword: z
      .string({ required_error: "Old password is required" })
      .min(8, "Old password must be at least 8 characters long"),

    newPassword: z
      .string({ required_error: "New password is required" })
      .min(8, "New password must be at least 8 characters long"),

    passwordConfirm: z.string({
      required_error: "Password confirmation is required",
    }),
  })
  .refine((data) => data.newPassword === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

const ChangePassword = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordValidation),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setSubmitting(true);
    const res = await changePassword(values);
    setSubmitting(false);

    if (res?.success) {
      toast.success("Password changed successfully!");
      reset();
    } else {
      toast.error(res?.message || "Failed to change password.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Change Password</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-8">
            {/* Old Password */}
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="oldPassword"
                type="password"
                {...register("oldPassword")}
              />
              {errors.oldPassword && (
                <p className="text-sm text-red-600">
                  {errors.oldPassword.message as string}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-600">
                  {errors.newPassword.message as string}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirm New Password</Label>
              <Input
                id="passwordConfirm"
                type="password"
                {...register("passwordConfirm")}
              />
              {errors.passwordConfirm && (
                <p className="text-sm text-red-600">
                  {errors.passwordConfirm.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || submitting}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isSubmitting || submitting ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;

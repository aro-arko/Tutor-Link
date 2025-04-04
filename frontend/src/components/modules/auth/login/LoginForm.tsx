/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import loginImage from "@/app/assets/images/login.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidation } from "../loginValidation";
import { toast } from "sonner";
import Link from "next/link";
import { getCurrentUser, loginUser } from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidation),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          if (redirect === "/booking") {
            router.push(`/tutors/${Cookies.get("tutorId")}`);
            Cookies.remove("tutorId");
          } else {
            router.push(redirect);
          }
        } else {
          const user = await getCurrentUser();
          router.push(`/${user.role}/dashboard`);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // Demo login handlers (to be updated with actual credentials)
  const handleDemoLogin = async (role: "student" | "tutor") => {
    const demoCredentials =
      role === "student"
        ? { email: "arko@tutorlink.com", password: "demo1234" }
        : { email: "sukhminder@tutorlink.com", password: "demo1234" };

    try {
      const res = await loginUser(demoCredentials);
      if (res?.success) {
        toast.success(`Demo login successful!`);
        const user = await getCurrentUser();
        router.push(`/${user.role}/dashboard`);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed demo login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block flex-1 p-10">
          <Image
            src={loginImage}
            alt="Login"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 p-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Welcome Back! 👋
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Log in to your TutorLink account and continue your learning journey.
          </p>

          {/* Demo Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <Button
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:text-blue-800 border border-blue-200 w-full md:w-auto cursor-pointer"
              onClick={() => handleDemoLogin("student")}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Demo Student
            </Button>
            <Button
              variant="outline"
              className="bg-red-50 text-red-700 hover:text-red-800 border border-red-200 w-full md:w-auto cursor-pointer"
              onClick={() => handleDemoLogin("tutor")}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Demo Tutor
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="email"
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 cursor-pointer"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register-student"
                className="text-red-600 hover:underline font-semibold cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

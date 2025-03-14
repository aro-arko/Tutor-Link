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
import {
  getCurrentUser,
  loginUser,
  // reCaptchaTokenVerification,
} from "@/services/AuthService";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginValidation),
  });

  const {
    formState: { isSubmitting },
  } = form;

  // const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  // const handleReCaptcha = async (value: string | null) => {
  //   try {
  //     const res = await reCaptchaTokenVerification(value!);
  //     if (res?.success) {
  //       setReCaptchaStatus(true);
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
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
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              {/* Password Field */}
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
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>

          {/* Registration Prompt */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register-student"
                className="text-red-600 hover:underline font-semibold"
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

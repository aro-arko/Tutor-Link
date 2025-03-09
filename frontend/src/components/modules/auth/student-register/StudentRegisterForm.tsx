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
import studentsImage from "@/app/assets/images/students.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationValidation } from "../registerValidation";
import { registerStudent } from "@/services/AuthService";
import { toast } from "sonner";

const StudentRegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationValidation),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");
  console.log(password, passwordConfirm);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerStudent(data);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block flex-1">
          <Image
            src={studentsImage}
            alt="Students"
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 p-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Student Registration 🎓
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Join TutorLink and start learning today!
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Enter your full name"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />

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
              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value || ""}
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full"
                      />
                    </FormControl>

                    {passwordConfirm && password !== passwordConfirm ? (
                      <FormMessage className="text-red-600">
                        Password does not match
                      </FormMessage>
                    ) : (
                      <FormMessage className="text-red-600" />
                    )}
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterForm;

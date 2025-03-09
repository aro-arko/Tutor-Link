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
import studentsImage from "../../../../app/assets/images/students.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const StudentRegisterForm = () => {
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Container for Form and Image */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section (Hidden on Mobile) */}
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
                Register
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegisterForm;

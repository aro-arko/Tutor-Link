"use client";

import banner from "@/app/assets/images/banner-img.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="min-h-[80vh] w-full max-w-7xl mx-auto flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8 pt-20 md:pt-12">
      {/* Main Container */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-8">
        {/* Left Section: Text and Search Bar */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find the Best Tutors in Minutes!
          </h1>
          <p className="text-xl text-gray-600">
            Book expert tutors for personalized learning.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg">
            <Input
              type="text"
              placeholder="Search by subject, grade, or name..."
              className="w-full pl-10 pr-4 py-6 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/register-student">
              <Button className="bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg">
                Sign Up as a Student
              </Button>
            </Link>
            <Link href="/register-tutor">
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 py-6 px-8 text-lg"
              >
                Register as a Tutor
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Section: Banner Image (Hidden on Small Screens) */}
        <div className="flex-1 hidden md:flex justify-end">
          <div className="max-w-[500px]">
            <Image
              src={banner}
              alt="Tutors"
              className="w-full h-auto object-cover rounded-lg shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

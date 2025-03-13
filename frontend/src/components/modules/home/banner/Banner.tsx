"use client";

import banner from "@/app/assets/images/banner-img.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Banner = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState<"name" | "subject">("name"); // Default to "name"
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }

    // Redirect to /tutors with the appropriate query parameter
    const queryParam = searchType === "name" ? "name" : "subject";
    router.push(`/tutors?${queryParam}=${encodeURIComponent(searchQuery)}`);
  };

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

          {/* Search Bar with Integrated Dropdown and Button */}
          <div className="flex items-center gap-2 max-w-lg">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Select
                  value={searchType}
                  onValueChange={(value: "name" | "subject") =>
                    setSearchType(value)
                  }
                >
                  <SelectTrigger className="w-[100px] h-8 bg-transparent border-none focus:ring-0 p-0">
                    <SelectValue placeholder="Search by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="subject">Subject</SelectItem>
                  </SelectContent>
                </Select>
                <div className="h-5 w-px bg-gray-300"></div>
              </div>
              <Input
                type="text"
                placeholder="Search by name or subject..."
                className="w-full pl-32 pr-4 py-6 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-700 text-white py-6 px-8 text-lg rounded-lg"
            >
              Search
            </Button>
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

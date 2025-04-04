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
import { useUser } from "@/context/UserContext";

const Banner = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState<"name" | "subject">("subject");
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert("Please enter a search term.");
      return;
    }

    const queryParam = searchType === "name" ? "name" : "subject";
    router.push(`/tutors?${queryParam}=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-[70vh] md:min-h-[80vh] w-full max-w-7xl mx-auto flex items-center justify-center bg-white py-8 px-4 sm:px-6 lg:px-0 pt-16 md:pt-12">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
        {/* Banner Image (Now visible on all screens) */}
        <div className="w-full md:hidden mb-6">
          <div className="max-w-[300px] mx-auto">
            <Image
              src={banner}
              alt="Tutors"
              className="w-full h-auto object-cover rounded-lg shadow-md"
              priority
            />
          </div>
        </div>

        {/* Left Section: Text and Search Bar */}
        <div className="flex-1 space-y-6 md:space-y-8 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find the Best Tutors in Minutes!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Book expert tutors for personalized learning.
          </p>

          {/* Search Bar with Integrated Dropdown and Button */}
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-lg mx-auto md:mx-0">
            <div className="relative w-full">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <Select
                  value={searchType}
                  onValueChange={(value: "subject" | "name") =>
                    setSearchType(value)
                  }
                >
                  <SelectTrigger className="w-[90px] sm:w-[100px] h-8 bg-transparent border-none shadow-none focus:ring-0 p-0">
                    <SelectValue placeholder="Search by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subject">Subject</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
                <div className="h-5 w-px bg-gray-300"></div>
              </div>
              <Input
                type="text"
                placeholder="Search by name or subject..."
                className="w-full pl-28 sm:pl-32 pr-4 py-5 sm:py-6 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white py-5 sm:py-6 px-6 sm:px-8 text-lg rounded-lg"
            >
              Search
            </Button>
          </div>

          {/* Call-to-Action Buttons */}
          {!user && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <Link href="/register-student" className="w-full sm:w-auto">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 sm:py-6 px-6 sm:px-8 text-lg">
                  Sign Up as Student
                </Button>
              </Link>
              <Link href="/register-tutor" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-50 py-5 sm:py-6 px-6 sm:px-8 text-lg"
                >
                  Register as Tutor
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Section: Banner Image (Hidden on mobile, shown on md+) */}
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

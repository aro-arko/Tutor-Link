"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { tutorInfo } from "@/services/TutorService";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  Mail,
  MapPin,
  Phone,
  Star,
  BookOpen,
  Clock,
  GraduationCap,
  User,
} from "lucide-react";
import Image from "next/image";

const TutorProfile = () => {
  const [tutorData, setTutorData] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    hourlyRate: 0,
    tutorImage: "",
    phone: "",
    subjects: [] as { _id: string; name: string }[],
    qualification: "",
    students: 0,
    age: 0,
    rating: 0,
    availability: [] as { day: string; timeSlots: string }[],
    backgroundImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tutorResponse = await tutorInfo();
        if (tutorResponse.success) {
          setTutorData({
            name: tutorResponse.data.name,
            email: tutorResponse.data.email,
            bio: tutorResponse.data.bio,
            address: tutorResponse.data.address,
            hourlyRate: tutorResponse.data.hourlyRate,
            tutorImage: tutorResponse.data.tutorImage,
            phone: tutorResponse.data.phone,
            subjects: tutorResponse.data.subject,
            qualification: tutorResponse.data.qualification,
            students: tutorResponse.data.bookedStudents?.length || 0,
            rating: tutorResponse.data.rating || 0,
            age: tutorResponse.data.age,
            availability: tutorResponse.data.availability,
            backgroundImage: tutorResponse.data.backgroundImage,
          });
        } else {
          setError("Failed to fetch tutor information.");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError("Something went wrong. Please try again.");
        console.error("Error fetching tutor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-center rounded-lg max-w-md mx-auto mt-10">
        <div className="text-red-600 font-medium">{error}</div>
        <Button
          variant="outline"
          className="mt-4 border-red-200 text-red-600 hover:bg-red-50"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        {/* Profile Header */}
        <div className="relative mb-12">
          <div className="relative h-64 w-full rounded-xl overflow-hidden shadow-md">
            {tutorData.backgroundImage ? (
              <Image
                src={tutorData.backgroundImage}
                alt={`${tutorData.name}'s background`}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 flex items-center justify-center text-gray-400">
                Background Image
              </div>
            )}
          </div>

          <div className="flex flex-col items-center -mt-20">
            <div className="relative h-40 w-40 border-4 border-white rounded-full shadow-lg">
              <Avatar className="h-full w-full">
                <AvatarImage src={tutorData.tutorImage} />
                <AvatarFallback className="bg-red-100 text-red-800 text-4xl">
                  {tutorData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <h1 className="text-3xl font-bold mt-6 text-gray-800">
              {tutorData.name}
            </h1>
            <div className="flex items-center mt-2 gap-4">
              <p className="text-lg font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                ${tutorData.hourlyRate}/hr
              </p>
            </div>

            <div className="mt-6">
              <Link href="/tutor/profile">
                <Button
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-50 cursor-pointer"
                >
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-red-600" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{tutorData.bio}</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Qualification</p>
                      <p className="font-medium">{tutorData.qualification}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{tutorData.age}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subjects Section */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-red-600" />
                  Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {tutorData.subjects.map((subject) => (
                    <Badge
                      key={subject._id}
                      variant="outline"
                      className="px-4 py-2 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    >
                      {subject.name}
                    </Badge>
                  ))}
                  {tutorData.subjects.length === 0 && (
                    <p className="text-gray-500">No subjects added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Availability Section */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-red-600" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tutorData.availability.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tutorData.availability.map((slot, index) => (
                      <div key={index} className="p-3 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-gray-800">
                          {slot.day}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {slot.timeSlots}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No availability set</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5 text-red-600" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{tutorData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{tutorData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {tutorData.address || "Not specified"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Stats */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-white">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Star className="h-5 w-5 text-red-600" />
                  Teaching Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {tutorData.students}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Students</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {tutorData.rating}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;

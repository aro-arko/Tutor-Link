/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getMe } from "@/services/StudentService";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Edit } from "lucide-react"; // Import icons
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const EditProfile = () => {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        setLoading(true);
        const res = await getMe();
        if (res.success) {
          setStudentData(res.data);
        } else {
          setError("Failed to fetch student profile");
          console.error("Failed to fetch student profile:", res.message);
        }
      } catch (error) {
        setError("Error fetching student profile");
        console.error("Error fetching student profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 p-4 rounded-lg text-red-600 border border-red-100">
          {error}
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="p-4">
        <p className="text-gray-500">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="space-y-4">
        <Separator />
        {/* Name Card */}
        <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-full">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-base font-semibold">{studentData.name}</p>
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-full">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-semibold">{studentData.email}</p>
            </div>
          </div>
        </div>

        {/* Phone Number Card */}
        <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-full">
              <Phone className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-base font-semibold">
                {studentData.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <Button
          variant="outline"
          onClick={() => router.push("/student/profile")}
          className=" mx-auto  flex cursor-pointer items-center justify-center space-x-2"
        >
          <Edit className="w-5 h-5" />
          <span>Edit Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;

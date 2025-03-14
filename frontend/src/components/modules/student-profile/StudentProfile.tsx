"use client";

import { getMe, updateStudentProfile } from "@/services/StudentService";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(studentData);
      const response = await updateStudentProfile(studentData);
      if (response.success) {
        setStudentData(response.data);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 bg-red-50">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-8 w-8"></div>
          <div className="flex-1 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!studentData) {
    return <p>No student profile found.</p>;
  }

  return (
    <div className="min-h-screen py-8 rounded-2xl bg-red-50">
      <div className="flex justify-center p-6">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Student Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={studentData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={studentData.email}
                    readOnly
                    className="bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Education Level and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education Level
                  </label>
                  <Input
                    type="text"
                    name="educationLevel"
                    value={studentData.educationLevel}
                    onChange={handleChange}
                    placeholder="Enter your education level"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <Input
                    type="number"
                    name="age"
                    value={studentData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    required
                  />
                </div>
              </div>

              {/* Phone Number and Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={studentData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={studentData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </div>

              {/* Update Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;

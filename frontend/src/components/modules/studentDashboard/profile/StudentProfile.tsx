"use client";

import { useEffect, useState } from "react";
import { getMe, updateStudentProfile } from "@/services/StudentService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { TStudent } from "@/types/student";

const StudentProfile = () => {
  const [studentData, setStudentData] = useState<TStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMe();
        if (res.success) {
          setStudentData(res.data);
        } else {
          setError("Failed to fetch student profile.");
        }
      } catch (err) {
        console.error("Error fetching student profile:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setStudentData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-4 bg-red-50 text-center rounded-lg max-w-md mx-auto mt-10">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen md:bg-gray-50 rounded-lg py-12 px-1 md:px-4">
      <div className=" mx-auto space-y-10">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-32 w-32 border-4 border-white rounded-full shadow-md">
            <Avatar className="h-full w-full">
              <AvatarImage src="https://bookshop-frontend-six.vercel.app/assets/admin-BDCeUw0Y.webp" />
              <AvatarFallback className="bg-blue-100 text-blue-800 text-4xl">
                {studentData?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {studentData?.name}
          </h1>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl font-bold">
              Edit Student Profile
              <Pencil className="h-5 w-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={studentData?.name}
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
                    value={studentData?.email}
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
                    value={studentData?.educationLevel}
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
                    value={studentData?.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    required
                  />
                </div>
              </div>

              {/* Phone and Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    value={studentData?.phoneNumber}
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
                    value={studentData?.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 py-5 font-medium cursor-pointer "
                >
                  Update
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;

"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/services/StudentService";
import { studentBookings } from "@/services/BookingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  CheckCircle,
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const StudentProfile = () => {
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getMe();
        if (res.success) {
          setStudent(res.data);
        } else {
          setError("Failed to fetch student profile.");
        }
      } catch (err) {
        setError("Something went wrong.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompletedBookings = async () => {
      try {
        const res = await studentBookings();
        if (res.success) {
          const completed = res.data.filter(
            (b: any) => b.approvalStatus === "completed"
          );
          setCompletedCount(completed.length);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchStudent();
    fetchCompletedBookings();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="p-4 bg-red-50 text-center rounded-lg max-w-md mx-auto mt-10">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 space-y-10">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center text-center">
          <div className="relative h-32 w-32 border-4 border-white rounded-full shadow-md">
            <Avatar className="h-full w-full">
              <AvatarImage src="https://bookshop-frontend-six.vercel.app/assets/admin-BDCeUw0Y.webp" />
              <AvatarFallback className="bg-blue-100 text-blue-800 text-4xl">
                {student?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {student?.name}
          </h1>

          {/* Edit Button */}
          <div className="mt-4">
            <Link href="/student/profile">
              <Button
                variant="outline"
                className="border-red-300 text-red-700 hover:bg-red-50"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education & Age */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="h-5 w-5" /> Education Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderItem("Education Level", student?.educationLevel)}
              {renderItem("Age", student?.age, <User />)}
              {renderItem(
                "Completed Sessions",
                completedCount,
                <CheckCircle className="text-gray-800" />
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5" /> Contact Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderItem("Email", student?.email, <Mail />)}
              {renderItem("Phone", student?.phoneNumber, <Phone />)}
              {renderItem("Address", student?.address, <MapPin />)}
            </CardContent>
          </Card>

          {/* Meta Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" /> Record Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderItem(
                "Created At",
                new Date(student?.createdAt).toLocaleString()
              )}
              {renderItem(
                "Updated At",
                new Date(student?.updatedAt).toLocaleString()
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const renderItem = (
  label: string,
  value: string | number,
  icon?: React.ReactNode
) => (
  <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg">
    {icon && <div className="pt-1">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800 break-words">{value}</p>
    </div>
  </div>
);

export default StudentProfile;

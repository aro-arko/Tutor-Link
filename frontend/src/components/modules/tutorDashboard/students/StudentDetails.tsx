"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getStudentById } from "@/services/TutorService";
import {
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Calendar,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TStudent } from "@/types/student";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const StudentDetails = () => {
  const { id } = useParams() as { id: string };
  const [studentData, setStudentData] = useState<TStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await getStudentById(id);
        if (res.success) {
          setStudentData(res.data);
        } else {
          setError("Failed to fetch student details.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-4 max-w-md mx-auto mt-10 bg-red-50 text-red-600 text-center rounded-lg">
        {error}
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="p-4 max-w-md mx-auto mt-10 bg-gray-50 text-gray-600 text-center rounded-lg">
        No student details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen md:bg-gray-50 rounded-lg py-12 ">
      <div className="mx-auto px-1 md:px-4">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-10">
          <Avatar className="h-32 w-32 border-4 border-white shadow-md">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-100 text-gray-800 text-4xl">
              {studentData.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-bold mt-4 text-gray-800">
            {studentData.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Info */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <User className="h-5 w-5" />
                General Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailItem label="Student ID" value={studentData._id} />
              <DetailItem
                label="Education Level"
                value={studentData.educationLevel as string}
                icon={<GraduationCap className="h-4 w-4 text-gray-500" />}
              />
              <DetailItem
                label="Age"
                value={studentData.age as number}
                icon={<User className="h-4 w-4 text-gray-500" />}
              />
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <Mail className="h-5 w-5" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailItem
                label="Email"
                value={studentData.email}
                icon={<Mail className="h-4 w-4 text-gray-500" />}
              />
              <DetailItem
                label="Phone"
                value={studentData.phoneNumber as string}
                icon={<Phone className="h-4 w-4 text-gray-500" />}
              />
              <DetailItem
                label="Address"
                value={studentData.address as string}
                icon={<MapPin className="h-4 w-4 text-gray-500" />}
              />
            </CardContent>
          </Card>

          {/* Created/Updated Info */}
          <Card className="border border-gray-200 shadow-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
                <Calendar className="h-5 w-5" />
                Record Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailItem
                label="Created At"
                value={new Date(studentData.createdAt).toLocaleString()}
              />
              <DetailItem
                label="Updated At"
                value={new Date(studentData.updatedAt).toLocaleString()}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 bg-red-50 p-3 rounded-lg">
    {icon && <div className="pt-1">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-800 break-words">{value}</p>
    </div>
  </div>
);

export default StudentDetails;

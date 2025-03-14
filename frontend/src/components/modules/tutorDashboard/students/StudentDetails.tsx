"use client";

import { getStudentById } from "@/services/TutorService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const StudentDetails = () => {
  const { id } = useParams() as { id: string };
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        setLoading(true);
        const res = await getStudentById(id);
        if (res.success) {
          setStudentData(res.data);
        } else {
          setError("Failed to fetch student details");
          console.error("Failed to fetch student details:", res.message);
        }
      } catch (error) {
        setError("Error fetching student details");
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="bg-red-100 text-red-600 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="p-4 text-center">
        <div className="bg-gray-100 text-gray-600 p-4 rounded-md">
          No student details found.
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6 bg-red-50 py-12  rounded-2xl">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-gray-900 py-6 text-white rounded-t-md">
          <CardTitle className="text-xl font-bold">Student Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 text-gray-700">
            <DetailRow label="Student ID" value={studentData._id} />
            <DetailRow label="Name" value={studentData.name} />
            <DetailRow label="Email" value={studentData.email} />
            <DetailRow
              label="Education Level"
              value={studentData.educationLevel}
            />
            <DetailRow label="Age" value={studentData.age} />
            <DetailRow label="Phone Number" value={studentData.phoneNumber} />
            <DetailRow label="Address" value={studentData.address} />
            <DetailRow
              label="Created At"
              value={new Date(studentData.createdAt).toLocaleDateString()}
            />
            <DetailRow
              label="Updated At"
              value={new Date(studentData.updatedAt).toLocaleDateString()}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Reusable component for each row
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b py-2">
    <span className="font-medium text-gray-900">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default StudentDetails;

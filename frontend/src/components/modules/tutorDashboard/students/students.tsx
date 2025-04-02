"use client";

import { getStudentById, tutorInfo } from "@/services/TutorService";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User, BadgeCheck, Mail } from "lucide-react";

const Students = () => {
  const [studentsData, setStudentsData] = useState<
    { _id: string; name: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const tutorRes = await tutorInfo();

        if (!tutorRes.success) {
          setError("Failed to fetch tutor info");
          return;
        }

        const bookedStudents = tutorRes.data.bookedStudents;

        if (bookedStudents.length === 0) {
          setStudentsData([]);
          return;
        }

        const studentDetails = await Promise.all(
          bookedStudents.map(async (studentId: string) => {
            const res = await getStudentById(studentId);
            return res.success ? res.data : null;
          })
        );

        setStudentsData(studentDetails.filter((student) => student !== null));
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 w-full bg-red-100 animate-pulse rounded-lg"
          />
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

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        Booked Students
      </h1>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium transition">
          <User className="w-4 h-4" />
          <span>Total Students: {studentsData.length}</span>
        </div>
      </div>

      {studentsData.length !== 0 ? (
        <ul className="space-y-4">
          {studentsData.map((student) => (
            <li
              key={student._id}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:gap-4 space-y-4 md:space-y-0">
                {/* Student ID */}
                <div className="flex items-center space-x-3 w-full md:w-1/3">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <Link href={`/tutor/students/${student._id}`}>
                      <p className="text-base font-semibold truncate hover:underline">
                        {student._id}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Name */}
                <div className="flex items-center space-x-3 w-full md:w-1/3">
                  <div className="p-2 bg-green-50 rounded-full">
                    <BadgeCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-base font-semibold truncate">
                      {student.name}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3 w-full md:w-1/3">
                  <div className="p-2 bg-red-50 rounded-full">
                    <Mail className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-semibold truncate">
                      {student.email}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No booked students found.</p>
      )}
    </div>
  );
};

export default Students;

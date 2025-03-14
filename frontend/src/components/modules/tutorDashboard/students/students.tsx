"use client";

import { getStudentById, tutorInfo } from "@/services/TutorService";
import { useEffect, useState } from "react";
import Link from "next/link";

const Students = () => {
  const [bookedStudents, setBookedStudents] = useState<string[]>([]);
  const [studentsData, setStudentsData] = useState<
    { _id: string; name: string; email: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutorInfo = async () => {
      try {
        setLoading(true);
        const res = await tutorInfo();
        if (res.success) {
          setBookedStudents(res.data.bookedStudents);
        } else {
          setError("Failed to fetch tutor info");
          console.error("Failed to fetch tutor info:", res.message);
        }
      } catch (error) {
        setError("Error fetching tutor info");
        console.error("Error fetching tutor info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorInfo();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (bookedStudents.length > 0) {
          const studentDetails = await Promise.all(
            bookedStudents.map(async (studentId) => {
              const res = await getStudentById(studentId);
              return res.success ? res.data : null;
            })
          );

          setStudentsData(studentDetails.filter((student) => student !== null));
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Failed to fetch student details");
      }
    };

    fetchStudents();
  }, [bookedStudents]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-red-100 h-8 w-8"></div>
          <div className="flex-1 space-y-3">
            <div className="h-3 bg-red-100 rounded w-3/4"></div>
            <div className="h-3 bg-red-100 rounded w-1/2"></div>
          </div>
        </div>
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
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Booked Students</h1>
      {studentsData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-red-100 rounded-lg overflow-hidden">
            <thead className="bg-red-50">
              <tr>
                <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                  Student ID
                </th>
                <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-red-50 transition-colors"
                >
                  <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                    <Link href={`/tutor/students/${student._id}`}>
                      <span className="text-blue-600 hover:underline">
                        {student._id}
                      </span>
                    </Link>
                  </td>
                  <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                    {student.name}
                  </td>
                  <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                    {student.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No booked students found.</p>
      )}
    </div>
  );
};

export default Students;

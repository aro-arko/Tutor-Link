"use client";

import { useEffect, useState } from "react";
import { getAllBookings } from "@/services/BookingService";
import { getStudents } from "@/services/StudentService";
import { getAllTutors } from "@/services/TutorService";
import { CalendarCheck, GraduationCap, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountUp } from "@/hooks/useCountUp";
import { Skeleton } from "@/components/ui/skeleton";

const QuickStats = () => {
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await getStudents();
        setStudents(studentsRes.data);

        const tutorsRes = await getAllTutors();
        setTutors(tutorsRes.data);

        const bookingsRes = await getAllBookings();
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const studentCount = useCountUp(students.length);
  const tutorCount = useCountUp(tutors.length);
  const bookingCount = useCountUp(bookings.length);

  const stats = [
    {
      title: "Students",
      count: studentCount,
      icon: Users,
      color: "text-blue-600",
      description: "Enrolled learners on the platform",
    },
    {
      title: "Tutors",
      count: tutorCount,
      icon: GraduationCap,
      color: "text-green-600",
      description: "Verified educators teaching actively",
    },
    {
      title: "Bookings",
      count: bookingCount,
      icon: CalendarCheck,
      color: "text-red-600",
      description: "Confirmed tutoring sessions so far",
    },
  ];

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-0">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
          Platform Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-200"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <Skeleton className="w-14 h-14 rounded-full bg-gray-200" />
                <Skeleton className="w-1/2 h-6 rounded bg-gray-200" />
                <Skeleton className="w-1/3 h-10 rounded bg-gray-200" />
              </div>
              <div className="mt-6">
                <Skeleton className="w-3/4 h-4 mx-auto rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 pt-16 pb-8 sm:px-6 lg:px-0">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">
        Platform Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map(
          ({ title, count, icon: Icon, color, description }, index) => (
            <Card
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md border border-gray-200"
            >
              <CardHeader className="flex flex-col items-center text-center space-y-4">
                <div
                  className={`rounded-full p-4 bg-gray-100 shadow-inner ${color}`}
                >
                  <Icon className="w-10 h-10" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  {title}
                </CardTitle>
                <span className="text-4xl font-bold text-gray-900">
                  {count}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm text-center">
                  {description}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};

export default QuickStats;

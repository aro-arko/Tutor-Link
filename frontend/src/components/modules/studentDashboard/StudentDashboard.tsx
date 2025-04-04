"use client";

import { useUser } from "@/context/UserContext";
import ActiveBookings from "./activeBookings/ActiveBookings";
import EditProfile from "./editProfile/EditProfile";
import { TStudent } from "@/types/student";
import { useEffect, useState } from "react";
import { getMe } from "@/services/StudentService";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import TotalBookings from "./totalBookings/TotalBookings";
import PendingBookings from "./pendingBookings/PendingBookings";

const StudentDashboard = () => {
  const { user } = useUser();

  const [studentData, setStudentData] = useState<TStudent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getMe();
        if (response.success) {
          setStudentData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch student info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "student") {
      fetchStudentData();
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-black mb-2">
          Welcome, {studentData?.name || "Student"}! 👋
        </h1>
        <p className="text-gray-700 text-base">
          This is your Student Dashboard. View your tutors, track your bookings,
          manage your sessions, and continue your learning journey — all in one
          place.
        </p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-red-50 border border-red-100 h-[400px] overflow-y-auto">
          <TotalBookings />
        </div>

        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[400px] overflow-y-auto">
          <ActiveBookings />
        </div>

        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[400px] overflow-y-auto">
          <PendingBookings />
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2 mt-8">
        {/* Active Sessions Card */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          {/* <ActiveBookings /> */}
        </div>

        {/* Earnings */}
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          <EditProfile />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

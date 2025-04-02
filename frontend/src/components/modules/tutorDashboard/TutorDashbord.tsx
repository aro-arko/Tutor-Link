"use client";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ActiveSessions from "./activeSessions/ActiveSessions";
import BookingApproval from "./booking-approval/BookingApproval";
import CreateSubject from "./createSubject/CreateSubject";
import EarningsReviewsRatings from "./earnings-reviews-ratings/EarningsReviewsRatings";
import TotalEarning from "./totalEarnings/TotalEarning";
import { useUser } from "@/context/UserContext";
import { tutorInfo } from "@/services/TutorService";
import { useEffect, useState } from "react";

const TutorDashboard = () => {
  const { user } = useUser();
  const [tutorData, setTutorData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await tutorInfo();
        if (response.success) {
          setTutorData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch tutor info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "tutor") {
      fetchTutorData();
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-black mb-2">
          Welcome, {tutorData?.name || "Tutor"}! 👋
        </h1>
        <p className="text-gray-700 text-base">
          This is your Tutor Management Dashboard. Track your sessions,
          earnings, ratings, and manage your subjects — all from here.
        </p>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-red-50 border border-red-100 h-[400px] overflow-y-auto">
          <ActiveSessions />
        </div>

        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[400px] overflow-y-auto">
          <EarningsReviewsRatings />
        </div>

        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[400px] overflow-y-auto">
          <BookingApproval />
        </div>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2 mt-8">
        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          <CreateSubject />
        </div>

        <div className="rounded-xl bg-red-50 border border-red-100 h-auto md:h-[450px] overflow-y-auto">
          <TotalEarning />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;

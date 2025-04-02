"use client";

import React, { useEffect, useState } from "react";
import { activeSessions } from "@/services/TutorService";
import { Alert } from "@/components/ui/alert";
import { User, Clock, Calendar, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { TBooking } from "@/types/booking";

const ActiveSessions = () => {
  const [totalActiveSessions, setTotalActiveSessions] = useState<TBooking[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const response = await activeSessions();
        if (response.success) {
          setTotalActiveSessions(response.data);
        } else {
          setTotalActiveSessions([]);
        }
      } catch (error) {
        console.error("Failed to fetch active sessions:", error);
        setError("Failed to fetch active sessions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSessions();
  }, []);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  const displayedSessions = totalActiveSessions.slice(0, 2);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>

      {/* Active Sessions Count Card */}
      <div className="p-4 bg-white border rounded-lg max-w-full shadow-sm hover:shadow-md transition-shadow mx-auto mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-50 rounded-full">
            <Activity className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Sessions</p>
            <p className="text-xl font-semibold">
              {totalActiveSessions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      {displayedSessions.length === 0 ? (
        <p className="text-gray-600">No active sessions found.</p>
      ) : (
        <ul className="space-y-4">
          <Separator />
          {displayedSessions.map((session: TBooking, index: number) => (
            <li
              key={session?._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-full mx-auto"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Student ID */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="text-base font-semibold truncate">
                      {session?.studentId || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Session Start Date */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-green-50 rounded-full">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Start</p>
                    <p className="text-base font-semibold truncate">
                      {session?.sessionStartDate
                        ? new Date(session.sessionStartDate).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Session End Date */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">End</p>
                    <p className="text-base font-semibold truncate">
                      {session?.sessionEndDate
                        ? new Date(session.sessionEndDate).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Active Status Indicator */}
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Show All/Show Less Button */}

      <div className="flex justify-center mt-4">
        <Link href={"/tutor/bookings/active"}>
          <Button className="cursor-pointer" variant="outline">
            Show All ({totalActiveSessions.length})
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ActiveSessions;

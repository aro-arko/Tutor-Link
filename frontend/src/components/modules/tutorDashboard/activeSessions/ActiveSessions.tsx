"use client";

import React, { useEffect, useState } from "react";
import { activeSessions } from "@/services/TutorService";
import { Alert } from "@/components/ui/alert";
import { User, Clock, Calendar } from "lucide-react"; // Import icons

const ActiveSessions = () => {
  const [totalActiveSessions, setTotalActiveSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveSessions = async () => {
      try {
        const response = await activeSessions();

        // Debugging: Log the response
        console.log("Fetched Active Sessions:", response);

        // Ensure response is an array before setting state
        if (response.success) {
          setTotalActiveSessions(response.data);
        } else {
          console.error("Expected an array but got:", response);
          setTotalActiveSessions([]); // Fallback to empty array
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
      <div className="flex items-center justify-center h-40">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-8 w-8"></div>
          <div className="flex-1 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Active Sessions</h1>
      {totalActiveSessions.length === 0 ? (
        <p className="text-gray-600">No active sessions found.</p>
      ) : (
        <ul className="space-y-4">
          {totalActiveSessions.map((session: any, index: number) => (
            <li
              key={session?._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-4xl mx-auto" // Limit card width
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
                    <p className="text-sm text-gray-500">Session Start</p>
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
                    <p className="text-sm text-gray-500">Session End</p>
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
    </div>
  );
};

export default ActiveSessions;

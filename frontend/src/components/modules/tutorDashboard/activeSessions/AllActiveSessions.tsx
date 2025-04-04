"use client";

import React, { useEffect, useState } from "react";
import { activeSessions } from "@/services/TutorService";
import { bookingApproval } from "@/services/BookingService";
import { Alert } from "@/components/ui/alert";
import {
  User,
  Clock,
  Calendar,
  Activity,
  ChevronDown,
  FileText,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { TBooking } from "@/types/booking";

const AllActiveSessions = () => {
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

  const handleStatusChange = async (bookingId: string) => {
    try {
      const updatedStatus = "completed";
      const response = await bookingApproval(bookingId, updatedStatus);

      if (response.success) {
        toast.success(`Booking ID: ${bookingId} marked as completed`);
        setTotalActiveSessions((prev) =>
          prev.filter((s) => s._id !== bookingId)
        );
      } else {
        toast.error(`Failed to update: ${response.message}`);
      }
    } catch (error) {
      toast.error("Error updating booking status");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-1/3 rounded-lg mx-auto" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        All Active Sessions
      </h1>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium transition ">
          <Activity className="w-4 h-4" />
          <span>Active Sessions: {totalActiveSessions.length}</span>
        </div>
      </div>

      {/* List */}
      {totalActiveSessions.length === 0 ? (
        <p className="text-gray-600">No active sessions found.</p>
      ) : (
        <ul className="space-y-4">
          {totalActiveSessions.map((session: TBooking, index: number) => (
            <li
              key={session?._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Booking ID */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-yellow-50 rounded-full">
                    <FileText className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <Link href={`/tutor/bookings/${session?._id}`}>
                      <p className="text-base font-semibold truncate hover:underline">
                        {session?._id}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Student ID */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Student ID</p>
                    <Link href={`/tutor/students/${session?.studentId}`}>
                      <p className="text-base font-semibold truncate text-blue-600 hover:text-blue-800 hover:underline">
                        {session?.studentId}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Start Date */}
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

                {/* End Date */}
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

                {/* Complete Dropdown */}
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="p-1.5 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100">
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(session._id)}
                      >
                        Mark as Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllActiveSessions;

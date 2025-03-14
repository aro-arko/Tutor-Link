/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { User, DollarSign, ChevronDown } from "lucide-react";
import { bookingRequest } from "@/services/TutorService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bookingApproval } from "@/services/BookingService";
import { toast } from "sonner";

const BookingApproval = () => {
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingRequests = async () => {
      try {
        const response = await bookingRequest();

        if (response.success) {
          setBookingRequests(response.data);
        } else {
          setBookingRequests([]);
        }
      } catch (error) {
        setError("Failed to fetch booking requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingRequests();
  }, []);

  const handleStatusChange = async (bookingId: string, status: string) => {
    try {
      const updatedStatus =
        status === "Confirm"
          ? "confirmed"
          : status === "Completed"
          ? "completed"
          : "canceled";

      const response = await bookingApproval(bookingId, updatedStatus);

      if (response.success) {
        toast.success(`Booking ID: ${bookingId}, Status: ${updatedStatus}`);
      } else {
        console.error("Failed to update booking status:", response.message);
      }
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

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
      <h1 className="text-2xl font-bold mb-6">Booking Requests</h1>
      {bookingRequests.length === 0 ? (
        <p className="text-sm text-gray-600">No booking requests found.</p>
      ) : (
        <ul className="space-y-4">
          {bookingRequests.map((request: any, index: number) => (
            <li
              key={request?._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between space-x-4">
                {/* Student ID */}
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Student ID</p>
                    <p className="text-base font-semibold truncate">
                      {request?.studentId || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="p-1.5 bg-gray-50 rounded-full">
                    <DollarSign
                      className={`w-4 h-4 ${
                        request?.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Payment Status</p>
                    <p
                      className={`text-sm font-semibold truncate ${
                        request?.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {request?.status || "Unpaid"}
                    </p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="p-1.5 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100">
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(request._id, "Confirm")}
                    >
                      Confirm
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        handleStatusChange(request._id, "Completed")
                      }
                    >
                      Completed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(request._id, "Reject")}
                    >
                      Reject
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingApproval;

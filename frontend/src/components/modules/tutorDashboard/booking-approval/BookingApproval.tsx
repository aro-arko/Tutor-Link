"use client";

import React, { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { User, DollarSign, ChevronDown, UserCheck } from "lucide-react";
import { bookingRequest } from "@/services/TutorService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bookingApproval } from "@/services/BookingService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { TBooking } from "@/types/booking";

const BookingApproval = () => {
  const [bookingRequests, setBookingRequests] = useState<TBooking[]>([]);
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
        console.error("Failed to fetch booking requests:", error);
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

        if (updatedStatus === "confirmed" || updatedStatus === "canceled") {
          setBookingRequests((prev) =>
            prev.filter((req) => req._id !== bookingId)
          );
        } else {
          // Otherwise update approvalStatus
          setBookingRequests((prev) =>
            prev.map((req) =>
              req._id === bookingId
                ? { ...req, approvalStatus: updatedStatus }
                : req
            )
          );
        }
      } else {
        toast.error("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

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

  const displayedRequests = bookingRequests.slice(0, 2);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Booking Requests</h1>

      {/* Total Requests Count */}
      <div className="p-4 bg-white border rounded-lg max-w-full shadow-sm hover:shadow-md transition-shadow mx-auto mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-50 rounded-full">
            <UserCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-xl font-semibold">{bookingRequests.length}</p>
          </div>
        </div>
      </div>

      {/* Request List */}
      {displayedRequests.length === 0 ? (
        <p className="text-gray-600">No booking requests found.</p>
      ) : (
        <ul className="space-y-4">
          <Separator />
          {displayedRequests.map((request: TBooking, index: number) => (
            <li
              key={request?._id || index}
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
                      {request?.studentId || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-green-50 rounded-full">
                    <DollarSign
                      className={`w-5 h-5 ${
                        request?.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Payment</p>
                    <p
                      className={`text-base font-semibold truncate ${
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
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="p-1.5 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100">
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      {request.approvalStatus === "confirmed" ? (
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(request._id, "Completed")
                          }
                        >
                          Completed
                        </DropdownMenuItem>
                      ) : (
                        <>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(request._id, "Confirm")
                            }
                          >
                            Confirm
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(request._id, "Reject")
                            }
                          >
                            Reject
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Show All / Show Less Button */}
      <div className="flex justify-center mt-4">
        <Link href="/tutor/bookings/requests">
          <Button className="cursor-pointer" variant="outline">
            Show All ({bookingRequests.length})
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookingApproval;

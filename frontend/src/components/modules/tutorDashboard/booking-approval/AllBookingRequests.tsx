"use client";

import React, { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import {
  User,
  DollarSign,
  ChevronDown,
  UserCheck,
  FileText,
} from "lucide-react";
import { bookingRequest } from "@/services/TutorService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bookingApproval } from "@/services/BookingService";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { TBooking } from "@/types/booking";
import Link from "next/link";

const AllBookingRequests = () => {
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
        console.error("Fetch error:", error);
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

        if (updatedStatus === "completed") {
          setBookingRequests((prev) =>
            prev.filter((req) => req._id !== bookingId)
          );
        } else {
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
      console.error("Update error:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-10 w-1/3 rounded-lg mx-auto" />
        {[...Array(3)].map((_, i) => (
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
        Booking Requests
      </h1>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium transition ">
          <UserCheck className="w-4 h-4" />
          <span>Booking Requests: {bookingRequests.length}</span>
        </div>
      </div>

      {bookingRequests.length === 0 ? (
        <p className="text-gray-600">No booking requests found.</p>
      ) : (
        <ul className="space-y-4">
          {bookingRequests.map((request: TBooking, index: number) => (
            <li
              key={request?._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:gap-4 space-y-4 md:space-y-0">
                {/* Booking ID */}
                <div className="flex items-center space-x-3 w-full md:w-1/5">
                  <div className="p-2 bg-yellow-50 rounded-full">
                    <FileText className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <Link href={`/tutor/bookings/${request?._id}`}>
                      <p className="text-base font-semibold truncate hover:underline">
                        {request?._id}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Student ID */}
                <div className="flex items-center space-x-3 w-full md:w-1/5">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Student ID</p>
                    <Link href={`/tutor/students/${request?.studentId}`}>
                      <p className="text-base font-semibold truncate hover:underline">
                        {request?.studentId}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3 w-full md:w-1/5">
                  <div className="p-2 bg-orange-50 rounded-full">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-base font-semibold truncate">
                      USD {request?.price || "0.00"}
                    </p>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center space-x-3 w-full md:w-1/5">
                  <div className="p-2 bg-green-50 rounded-full">
                    <DollarSign
                      className={`w-5 h-5 ${
                        request?.status === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    />
                  </div>
                  <div>
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

                {/* Approval Dropdown */}
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
    </div>
  );
};

export default AllBookingRequests;

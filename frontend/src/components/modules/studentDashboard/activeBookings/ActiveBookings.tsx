/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { studentBookings } from "@/services/BookingService";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { CreditCard, CheckCircle, XCircle } from "lucide-react"; // Import icons

const ActiveBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await studentBookings();
        if (res.success) {
          const confirmedBookings = res.data.filter(
            (booking: any) => booking.approvalStatus === "confirmed"
          );
          setBookings(confirmedBookings);
        } else {
          setError("Failed to fetch bookings");
          console.error("Failed to fetch bookings:", res.message);
        }
      } catch (error) {
        setError("Error fetching bookings");
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
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
      <h1 className="text-2xl font-bold mb-6">Approved Bookings</h1>
      <ul className="space-y-4">
        {bookings.map((booking: any, index: number) => (
          <li
            key={booking?._id || index}
            className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-4xl mx-auto" // Limit card width
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
              {/* Booking ID */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-2 bg-blue-50 rounded-full">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="text-base font-semibold truncate">
                    {booking?._id || "N/A"}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-2 bg-green-50 rounded-full">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="text-base font-semibold truncate">
                    ${booking?.price || "N/A"}
                  </p>
                </div>
              </div>

              {/* Approval Status */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-2 bg-purple-50 rounded-full">
                  {booking?.approvalStatus === "confirmed" ? (
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Approval Status</p>
                  <p className="text-base font-semibold truncate">
                    {booking?.approvalStatus || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveBookings;

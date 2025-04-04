/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { studentBookings } from "@/services/BookingService";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

  // Loading State
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

  // Error State
  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Approved Bookings</h1>

      {/* Total Confirmed Bookings Card */}
      <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-50 rounded-full">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Confirmed Bookings</p>
            <p className="text-xl font-semibold">{bookings.length}</p>
          </div>
        </div>
      </div>

      {/* Booking List */}
      {bookings.length === 0 ? (
        <p className="text-gray-600">No confirmed bookings found.</p>
      ) : (
        <ul className="space-y-4">
          <Separator />
          {bookings.map((booking: any, index: number) => (
            <li
              key={booking._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Booking ID */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <Link href={`/student/bookings/${booking._id}`}>
                      <p className="text-base font-semibold truncate hover:underline">
                        {booking._id}
                      </p>
                    </Link>
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
                      ${booking.price || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Approval Status</p>
                    <p className="text-base font-semibold truncate">
                      {booking.approvalStatus || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Show All Button */}
      <div className="flex justify-center mt-6">
        <Link href="/student/bookings/approved">
          <Button className="cursor-pointer" variant="outline">
            Show All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ActiveBookings;

"use client";

import { studentBookings } from "@/services/BookingService";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  User,
  CreditCard,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import { TBooking } from "@/types/booking";
import Link from "next/link";

const MyBookings = () => {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await studentBookings();
        if (res.success) {
          const sorted = res.data.sort(
            (a: TBooking, b: TBooking) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setBookings(sorted);
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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
      <div className="p-4">
        <Alert variant="destructive">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="p-2 md:p-6 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium transition">
          <Calendar className="w-4 h-4" />
          <span>Total Bookings: {bookings.length}</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-center">No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Booking ID */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <Link href={`/student/bookings/${booking._id}`}>
                      <p className="text-base hover:underline font-semibold break-all">
                        {booking._id}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Tutor ID */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-green-50 rounded-full">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tutor ID</p>
                    <Link href={`/student/tutors/${booking.tutorId}`}>
                      <p className="text-base font-semibold hover:underline break-all">
                        {booking.tutorId}
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-base font-semibold">${booking.price}</p>
                  </div>
                </div>

                {/* Transaction */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-red-50 rounded-full">
                    <CreditCard className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transaction</p>
                    <p className="text-base font-semibold break-all">
                      {booking.status === "Paid"
                        ? booking.transaction?.id || "Paid"
                        : "Unpaid"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p
                      className={`text-base font-semibold capitalize ${
                        booking.approvalStatus === "confirmed"
                          ? "text-green-600"
                          : booking.approvalStatus === "pending"
                          ? "text-yellow-600"
                          : booking.approvalStatus === "canceled"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {booking.approvalStatus}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;

"use client";

import { studentBookings } from "@/services/BookingService";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await studentBookings();
        if (res.success) {
          setBookings(res.data);
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
          <div className="rounded-full bg-red-100 h-8 w-8"></div>
          <div className="flex-1 space-y-3">
            <div className="h-3 bg-red-100 rounded w-3/4"></div>
            <div className="h-3 bg-red-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 p-4 rounded-lg text-red-600 border border-red-100">
          {error}
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-red-100 rounded-lg overflow-hidden">
          <thead className="bg-red-50">
            <tr>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Booking ID
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Tutor ID
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Approval Status
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Price
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Transaction ID
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="hover:bg-red-50 transition-colors"
              >
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {booking._id}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {booking.tutorId}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      booking.approvalStatus === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : booking.approvalStatus === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.approvalStatus}
                  </span>
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  ${booking.price}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {booking.status === "Paid"
                    ? booking.transaction.id
                    : "Unpaid"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;

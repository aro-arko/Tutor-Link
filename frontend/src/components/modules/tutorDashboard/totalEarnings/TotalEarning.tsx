"use client";

import { tutorBookings, tutorEarnings } from "@/services/BookingService";
import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { DollarSign, Calendar, CheckCircle } from "lucide-react"; // Import icons

const TotalEarning = () => {
  const [earnings, setEarnings] = useState<number | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch earnings
        const earningsRes = await tutorEarnings();
        if (earningsRes.success) {
          setEarnings(earningsRes.data);
        } else {
          console.error("Failed to fetch earnings:", earningsRes.message);
        }

        // Fetch bookings
        const bookingsRes = await tutorBookings();
        if (bookingsRes.success) {
          setBookings(bookingsRes.data);
        } else {
          console.error("Failed to fetch bookings:", bookingsRes.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const paidBookings = bookings.filter((booking) => booking.status === "Paid");

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
      <h1 className="text-2xl font-bold mb-6">Total Earnings</h1>

      {/* Earnings Card */}
      <div className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-4xl mx-auto mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-green-50 rounded-full">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-xl font-semibold">
              {earnings !== null ? `$${earnings}` : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Paid Bookings Section */}
      <h2 className="text-2xl font-bold mb-6">Paid Bookings</h2>
      {paidBookings.length === 0 ? (
        <p className="text-gray-600">No paid bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {paidBookings.map((booking, index) => (
            <li
              key={booking?._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Booking ID */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="text-base font-semibold truncate">
                      {booking?._id || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Booking Price */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-base font-semibold truncate">
                      ${booking?.price || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-green-50 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-base font-semibold truncate">Paid</p>
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

export default TotalEarning;

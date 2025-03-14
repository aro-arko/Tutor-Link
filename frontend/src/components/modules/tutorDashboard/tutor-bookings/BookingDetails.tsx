"use client";

import { getTutorBookingById } from "@/services/TutorService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BookingDetails = () => {
  const { id } = useParams() as { id: string };
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (id) {
        try {
          setLoading(true);
          const res = await getTutorBookingById(id);
          console.log(res);
          if (res.success) {
            setBooking(res.data);
          } else {
            setError("Failed to fetch booking details");
            console.error("Failed to fetch booking details:", res.message);
          }
        } catch (error) {
          setError("Error fetching booking details");
          console.error("Error fetching booking details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookingDetails();
  }, [id]);

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

  if (!booking) {
    return (
      <div className="p-4">
        <div className="bg-gray-50 p-4 rounded-lg text-gray-600 border border-gray-100">
          No booking details found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">Booking ID:</div>
          <div className="w-2/3 text-gray-900">{booking._id}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">Student ID:</div>
          <div className="w-2/3 text-gray-900">{booking.studentId}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">Subject:</div>
          <div className="w-2/3 text-gray-900">{booking.subject}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">Start Date:</div>
          <div className="w-2/3 text-gray-900">
            {new Date(booking.sessionStartDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">End Date:</div>
          <div className="w-2/3 text-gray-900">
            {new Date(booking.sessionEndDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">Status:</div>
          <div className="w-2/3 text-gray-900">
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                booking.status === "Paid"
                  ? "bg-green-100 text-green-600"
                  : booking.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {booking.status}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">
            Approval Status:
          </div>
          <div className="w-2/3 text-gray-900">
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                booking.approvalStatus === "confirmed"
                  ? "bg-green-100 text-green-600"
                  : booking.approvalStatus === "completed"
                  ? "bg-blue-100 text-blue-600"
                  : booking.approvalStatus === "canceled"
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {booking.approvalStatus || "Pending"}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">Price:</div>
          <div className="w-2/3 text-gray-900">${booking.price}</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-1/3 font-semibold text-gray-700">
            Transaction ID:
          </div>
          <div className="w-2/3 text-gray-900">
            {booking.transaction?.id || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

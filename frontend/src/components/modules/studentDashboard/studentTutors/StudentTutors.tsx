/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { studentBookings } from "@/services/BookingService";
import { getTutorById } from "@/services/TutorService";
import { useEffect, useState } from "react";
import Link from "next/link";

const StudentTutors = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [tutors, setTutors] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await studentBookings();
        if (res.success) {
          const filteredBookings = res.data
            .filter(
              (booking: any) =>
                booking.approvalStatus === "confirmed" ||
                booking.approvalStatus === "completed"
            )
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          setBookings(filteredBookings);

          // Fetch tutor details for each booking
          const tutorDetails = await Promise.all(
            filteredBookings.map((booking: any) =>
              getTutorById(booking.tutorId)
            )
          );

          const tutorMap: { [key: string]: any } = {};
          tutorDetails.forEach((tutorRes, index) => {
            if (tutorRes.success) {
              tutorMap[filteredBookings[index].tutorId] = tutorRes.data;
            }
          });

          setTutors(tutorMap);
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

  const getTimeSlot = (tutorId: string, timeSlotId: string) => {
    const tutor = tutors[tutorId];
    if (tutor) {
      const availability = tutor.availability.find(
        (slot: any) => slot._id === timeSlotId
      );
      if (availability) {
        return `${availability.day} ${availability.timeSlots}`;
      }
    }
    return "N/A";
  };

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Tutors</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-red-100 rounded-lg overflow-hidden">
          <thead className="bg-red-50">
            <tr>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Tutor Name
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Booking ID
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Time Slot
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Approval Status
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
                  {tutors[booking.tutorId] ? (
                    <Link
                      href={`/student/tutors/${booking.tutorId}`}
                      className="text-blue-600 hover:underline"
                    >
                      {tutors[booking.tutorId].name}
                    </Link>
                  ) : (
                    "Loading..."
                  )}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {booking._id}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {getTimeSlot(booking.tutorId, booking.timeSlotId)}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      booking.approvalStatus === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : booking.approvalStatus === "completed"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.approvalStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTutors;

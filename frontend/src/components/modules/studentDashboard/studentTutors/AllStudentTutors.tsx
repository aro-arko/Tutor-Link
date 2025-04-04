"use client";

import { studentBookings } from "@/services/BookingService";
import { getTutorById } from "@/services/TutorService";
import { useEffect, useState } from "react";
import { User, Mail, Calendar } from "lucide-react";
import Link from "next/link";
import { TBooking } from "@/types/booking";
import { ITutor } from "@/types";

const AllStudentTutors = () => {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [tutors, setTutors] = useState<{ [key: string]: ITutor }>({});
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
              (booking: TBooking) =>
                booking.approvalStatus === "confirmed" ||
                booking.approvalStatus === "completed"
            )
            .sort(
              (a: TBooking, b: TBooking) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          setBookings(filteredBookings);

          const tutorDetails = await Promise.all(
            filteredBookings.map((booking: TBooking) =>
              getTutorById(booking.tutorId)
            )
          );

          const tutorMap: { [key: string]: ITutor } = {};
          tutorDetails.forEach((res, i) => {
            if (res.success) {
              tutorMap[filteredBookings[i].tutorId] = res.data;
            }
          });

          setTutors(tutorMap);
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching data");
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
        (slot: { _id: string; day: string; timeSlots: string }) =>
          slot._id === timeSlotId
      );
      if (availability) {
        return `${availability.day} ${availability.timeSlots}`;
      }
    }
    return "N/A";
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-24 w-full bg-red-100 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-1 md:p-4">
        <div className="bg-red-50 p-4 rounded-lg text-red-600 border border-red-100">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-1 md:p-4 w-full">
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        My Tutors
      </h1>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-green-100 hover:bg-green-200 text-green-700 text-sm font-medium transition">
          <User className="w-4 h-4" />
          <span>Total Tutors: {Object.keys(tutors).length}</span>
        </div>
      </div>

      {bookings.length !== 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => {
            const tutor = tutors[booking.tutorId];
            if (!tutor) return null;

            return (
              <li
                key={`${booking._id}-${booking.tutorId}`}
                className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:gap-4 space-y-4 md:space-y-0">
                  {/* Tutor Name */}
                  <div className="flex items-center space-x-3 w-full md:w-1/3">
                    <div className="p-2 bg-blue-50 rounded-full">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tutor</p>
                      <Link
                        href={`/student/tutors/${booking.tutorId}`}
                        className="text-base font-semibold text-blue-600 hover:underline truncate block"
                      >
                        {tutor.name}
                      </Link>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-3 w-full md:w-1/3">
                    <div className="p-2 bg-red-50 rounded-full">
                      <Mail className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-base font-semibold truncate">
                        {tutor.email}
                      </p>
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div className="flex items-center space-x-3 w-full md:w-1/3">
                    <div className="p-2 bg-green-50 rounded-full">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time Slot</p>
                      <p className="text-base font-semibold truncate">
                        {getTimeSlot(booking.tutorId, booking.timeSlotId)}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No tutors found.</p>
      )}
    </div>
  );
};

export default AllStudentTutors;

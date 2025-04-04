/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { studentBookings } from "@/services/BookingService";
import { getTutorById } from "@/services/TutorService";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentTutors = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [tutors, setTutors] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await studentBookings();
        if (res.success) {
          const filtered = res.data
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

          setBookings(filtered.slice(0, 3)); // show latest 3 only

          const tutorDetails = await Promise.all(
            filtered
              .slice(0, 3)
              .map((booking: any) => getTutorById(booking.tutorId))
          );

          const tutorMap: { [key: string]: any } = {};
          tutorDetails.forEach((tutorRes, index) => {
            if (tutorRes.success) {
              tutorMap[filtered[index].tutorId] = tutorRes.data;
            }
          });

          setTutors(tutorMap);
        } else {
          setError("Failed to fetch bookings.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Error fetching bookings. Please try again later.");
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

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Tutors</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No tutor bookings found.</p>
      ) : (
        <ul className="space-y-4">
          <Separator />
          {bookings.map((booking, index) => (
            <li
              key={booking._id || index}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Tutor Name */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Tutor Name</p>
                    <p className="text-base font-semibold truncate">
                      {tutors[booking.tutorId] ? (
                        <Link
                          href={`/student/tutors/${booking.tutorId}`}
                          className="text-gray-800 hover:underline"
                        >
                          {tutors[booking.tutorId].name}
                        </Link>
                      ) : (
                        "Loading..."
                      )}
                    </p>
                  </div>
                </div>

                {/* Booking ID */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-green-50 rounded-full">
                    <CreditCard className="w-5 h-5 text-green-600" />
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

                {/* Time Slot */}
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Time Slot</p>
                    <p className="text-base font-semibold truncate">
                      {getTimeSlot(booking.tutorId, booking.timeSlotId)}
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
        <Link href="/student/tutors/all">
          <Button className="cursor-pointer" variant="outline">
            Show All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentTutors;

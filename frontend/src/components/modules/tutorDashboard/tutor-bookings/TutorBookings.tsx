"use client";

import { tutorBookings } from "@/services/BookingService";
import { getSubjectById } from "@/services/Subjects";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { bookingApproval } from "@/services/BookingService";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const TutorBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await tutorBookings();
        if (res.success) {
          setBookings(res.data);
          // Fetch subject details for each booking
          const subjectPromises = res.data.map((booking: any) =>
            getSubjectById(booking.subject)
          );
          const subjectResponses = await Promise.all(subjectPromises);
          const subjectData = subjectResponses.reduce(
            (acc: { [key: string]: string }, response: any) => {
              if (response.success) {
                acc[response.data._id] = response.data.name;
              }
              return acc;
            },
            {}
          );
          setSubjects(subjectData);
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
        toast.success(
          `Booking ID: ${bookingId}, Approval Status: ${updatedStatus}`
        );
        // Refresh bookings after status update
        const updatedBookings = bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, approvalStatus: updatedStatus }
            : booking
        );
        setBookings(updatedBookings);
      } else {
        console.error("Failed to update approval status:", response.message);
      }
    } catch (error) {
      console.error("Failed to update approval status:", error);
    }
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tutor Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-red-100 rounded-lg overflow-hidden">
          <thead className="bg-red-50">
            <tr>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Booking ID
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Student ID
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Subject
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Start Date
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                End Date
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Approval Status
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Price
              </th>
              <th className="py-3 px-4 text-left text-gray-900 font-semibold">
                Actions
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
                  <Link href={`/tutor/bookings/${booking._id}`}>
                    <span className="text-blue-600 hover:underline">
                      {booking._id}
                    </span>
                  </Link>
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {booking.studentId}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {subjects[booking.subject] || "Loading..."}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {new Date(booking.sessionStartDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  {new Date(booking.sessionEndDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
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
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
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
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  ${booking.price}
                </td>
                <td className="py-3 px-4 border-b border-red-100 text-gray-700">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="p-1.5 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100">
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40">
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(booking._id, "Confirm")
                        }
                      >
                        Confirm
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(booking._id, "Completed")
                        }
                      >
                        Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(booking._id, "Reject")
                        }
                      >
                        Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutorBookings;

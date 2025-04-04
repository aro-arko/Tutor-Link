"use client";

import { useEffect, useState } from "react";
import { tutorBookings, bookingApproval } from "@/services/BookingService";
import { getSubjectById } from "@/services/Subjects";
import { toast } from "sonner";
import { Alert } from "@/components/ui/alert";
import {
  Calendar,
  DollarSign,
  CheckCircle,
  MoreHorizontal,
  Book,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { TBooking } from "@/types/booking";

const TutorBookings = () => {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [subjects, setSubjects] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingRes = await tutorBookings();
        if (bookingRes.success) {
          setBookings(bookingRes.data);

          const subjectMap: { [key: string]: string } = {};
          const subjectResponses = await Promise.all(
            bookingRes.data.map((b: TBooking) => getSubjectById(b.subject))
          );
          subjectResponses.forEach((res) => {
            if (res.success) subjectMap[res.data._id] = res.data.name;
          });
          setSubjects(subjectMap);
        } else {
          setError("Failed to load bookings");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const status =
      newStatus === "Confirm"
        ? "confirmed"
        : newStatus === "Completed"
        ? "completed"
        : "canceled";

    const res = await bookingApproval(id, status);
    if (res.success) {
      toast.success(`Booking marked as ${status}`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, approvalStatus: status } : b))
      );
    } else {
      toast.error("Failed to update booking");
    }
  };

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
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Bookings</h1>

      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium transition ">
          <Calendar className="w-4 h-4" />
          <span>Total Bookings: {bookings.length}</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings available.</p>
      ) : (
        <ul className="space-y-4 w-full">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow w-full"
            >
              <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between items-start">
                {/* Booking ID */}
                <div className="flex items-start gap-3 min-w-[220px] flex-1">
                  <div className="p-2 bg-blue-50 rounded-full">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <Link
                      href={`/tutor/bookings/${booking._id}`}
                      className="text-base font-semibold text-blue-600 hover:underline break-all"
                    >
                      {booking._id}
                    </Link>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex items-start gap-3 min-w-[180px] flex-1">
                  <div className="p-2 bg-red-50 rounded-full">
                    <Book className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="text-base font-semibold">
                      {subjects[booking.subject] || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-start gap-3 min-w-[150px] flex-1">
                  <div className="p-2 bg-purple-50 rounded-full">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-base font-semibold">${booking.price}</p>
                  </div>
                </div>

                {/* Approval Status */}
                <div className="flex items-start gap-3 min-w-[150px] flex-1">
                  <div className="p-2 bg-green-50 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Approval</p>
                    <p
                      className={`text-base font-semibold capitalize ${
                        booking.approvalStatus === "confirmed"
                          ? "text-green-600"
                          : booking.approvalStatus === "completed"
                          ? "text-blue-600"
                          : booking.approvalStatus === "canceled"
                          ? "text-red-600"
                          : "text-gray-500"
                      }`}
                    >
                      {booking.approvalStatus || "Pending"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="p-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200">
                        <MoreHorizontal className="h-5 w-5 text-gray-600" />
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
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TutorBookings;

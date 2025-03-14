/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  studentBookings,
  studentCancelBooking,
} from "@/services/BookingService";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Import useRouter

const BookingLists = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter(); // Initialize Next.js router

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await studentBookings();
        if (response.success) {
          setBookings(response.data.reverse()); // Reverse for latest bookings first
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Handle cancel booking
  const handleCancelBooking = async (bookingId: string) => {
    const canceledBooking = bookings.find(
      (booking) => booking._id === bookingId
    );

    if (
      canceledBooking?.status === "Paid" ||
      canceledBooking?.approvalStatus !== "pending"
    ) {
      toast(
        "Sorry you can't cancel this booking. Please contact support for assistance.",
        { icon: "⚠️" }
      );
    } else {
      try {
        const response = await studentCancelBooking(bookingId);
        if (response.success) {
          // Update the state without refreshing the page
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking._id === bookingId
                ? { ...booking, approvalStatus: "canceled" }
                : booking
            )
          );
          toast.success("Booking canceled successfully!");
        }
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        toast.error("Failed to cancel booking. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Bookings</h1>
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Booking Information */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Booking ID: {booking._id}
                  </h2>
                  <p className="text-gray-600">Tutor ID: {booking.tutorId}</p>
                  <p className="text-gray-600">Subject ID: {booking.subject}</p>
                  <p className="text-gray-600">
                    Session:{" "}
                    {new Date(booking.sessionStartDate).toLocaleDateString()} -{" "}
                    {new Date(booking.sessionEndDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Duration: {booking.duration} hours
                  </p>

                  {/* Approval Status */}
                  <p className="text-gray-600">
                    Approval Status:{" "}
                    <span
                      className={`font-semibold ${
                        booking.approvalStatus === "confirmed"
                          ? "text-green-600"
                          : booking.approvalStatus === "completed"
                          ? "text-blue-600"
                          : booking.approvalStatus === "canceled"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {booking.approvalStatus}
                    </span>
                  </p>

                  {/* Payment Status */}
                  <p className="text-gray-600">
                    Payment Status:{" "}
                    <span
                      className={`font-semibold ${
                        booking.status === "Paid"
                          ? "text-green-600"
                          : booking.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>

                  <p className="text-gray-600">Price: ${booking.price}</p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Show "Pay Now" button if status is Unpaid and approvalStatus is not completed or canceled */}
                  {booking.status === "Unpaid" &&
                    booking.approvalStatus !== "completed" &&
                    booking.approvalStatus !== "canceled" && (
                      <Button
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() =>
                          (window.location.href = booking.paymentUrl)
                        }
                      >
                        Pay Now
                      </Button>
                    )}

                  {/* Show rebooking message if Payment Status is Pending */}
                  {booking.status === "Pending" && (
                    <p className="text-red-600 font-medium">
                      Payment Failed.{" "}
                      <span
                        className="text-blue-600 cursor-pointer underline"
                        onClick={() =>
                          router.push(`/tutors/${booking.tutorId}`)
                        }
                      >
                        Please rebook
                      </span>
                    </p>
                  )}

                  {/* Show "Cancel Booking" button if Payment Status is not Pending and Approval Status is not Canceled */}
                  {booking.status !== "Pending" &&
                    booking.approvalStatus !== "canceled" &&
                    (booking.status === "Paid" ||
                    booking.approvalStatus === "confirmed" ? (
                      <Button
                        variant="outline"
                        className="border-red-600 text-red-600"
                        onClick={() =>
                          toast("Contact support to cancel this booking.")
                        }
                      >
                        Cancel Booking
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="border-red-600 text-red-600"
                        onClick={() => handleCancelBooking(booking._id)}
                      >
                        Cancel Booking
                      </Button>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No bookings found.</p>
      )}
    </div>
  );
};

export default BookingLists;

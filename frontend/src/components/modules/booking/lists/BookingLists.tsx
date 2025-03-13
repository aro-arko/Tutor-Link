"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  studentBookings,
  studentCancelBooking,
} from "@/services/BookingService";
import { toast } from "sonner";

const BookingLists = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await studentBookings();
        if (response.success) {
          // Reverse the array to show the most recent booking first
          setBookings(response.data.reverse());
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  // Handle cancel booking
  //   const handleCancelBooking = async (bookingId: string) => {
  //     // Show a warning toast if status is Paid or approvalStatus is not pending
  //     const canceledBooking = bookings.find(
  //       (booking) => booking._id === bookingId
  //     );
  //     if (
  //       canceledBooking?.status === "Paid" ||
  //       canceledBooking?.approvalStatus !== "pending"
  //     ) {
  //       toast(
  //         "Sorry you can't cancel this booking. Please contact support for assistance.",
  //         {
  //           icon: "⚠️",
  //         }
  //       );
  //     } else {
  //       try {
  //         const response = await studentCancelBooking(bookingId);
  //         if (response.success) {
  //           setBookings((prev) =>
  //             prev.filter((booking) => booking._id !== bookingId)
  //           );
  //           toast.success("Booking canceled successfully!");
  //         }
  //       } catch (error) {
  //         console.error("Failed to cancel booking:", error);
  //         toast.error("Failed to cancel booking. Please try again.");
  //       }
  //     }
  //   };
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
                ? { ...booking, approvalStatus: "canceled" } // Update status locally
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
                  <p className="text-gray-600">
                    Payment Status:{" "}
                    <span
                      className={`font-semibold ${
                        booking.status === "Paid"
                          ? "text-green-600"
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
                  {/* Show "Pay Now" button only if approvalStatus is not completed or canceled */}
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

                  {/* Show "Cancel Booking" button only if approvalStatus is not canceled */}
                  {booking.approvalStatus !== "canceled" &&
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

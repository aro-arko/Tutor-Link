"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  studentBookings,
  studentCancelBooking,
} from "@/services/BookingService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Calendar,
  User,
  CreditCard,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";

const BookingLists = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await studentBookings();
        if (response.success) {
          setBookings(response.data.reverse());
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    const canceledBooking = bookings.find((b) => b._id === bookingId);

    if (
      canceledBooking?.status === "Paid" ||
      canceledBooking?.approvalStatus !== "pending"
    ) {
      toast("Sorry you can't cancel this booking. Please contact support.", {
        icon: "⚠️",
      });
    } else {
      try {
        const res = await studentCancelBooking(bookingId);
        if (res.success) {
          setBookings((prev) =>
            prev.map((b) =>
              b._id === bookingId ? { ...b, approvalStatus: "canceled" } : b
            )
          );
          toast.success("Booking canceled successfully!");
        }
      } catch (error) {
        console.error("Error cancelling:", error);
        toast.error("Failed to cancel. Please try again.");
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="py-4 px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto md:p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <ul className="space-y-5">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="p-5 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                  {/* Booking ID */}
                  <InfoBlock
                    icon={<Calendar className="w-5 h-5 text-blue-600" />}
                    label="Booking ID"
                    value={booking._id}
                  />
                  {/* Tutor ID */}
                  <InfoBlock
                    icon={<User className="w-5 h-5 text-green-600" />}
                    label="Tutor ID"
                    value={booking.tutorId}
                  />
                  {/* Subject ID */}
                  <InfoBlock
                    icon={<User className="w-5 h-5 text-yellow-600" />}
                    label="Subject"
                    value={booking.subject}
                  />
                  {/* Session Dates */}
                  <InfoBlock
                    icon={<Calendar className="w-5 h-5 text-purple-600" />}
                    label="Session Dates"
                    value={`${new Date(
                      booking.sessionStartDate
                    ).toLocaleDateString()} - ${new Date(
                      booking.sessionEndDate
                    ).toLocaleDateString()}`}
                  />
                  {/* Duration */}
                  <InfoBlock
                    icon={<ClockIcon />}
                    label="Duration"
                    value={`${booking.duration} hour(s)`}
                  />
                  {/* Price */}
                  <InfoBlock
                    icon={<DollarSign className="w-5 h-5 text-purple-600" />}
                    label="Price"
                    value={`$${booking.price}`}
                  />
                  {/* Approval */}
                  <InfoBlock
                    icon={<CheckCircle className="w-5 h-5 text-blue-600" />}
                    label="Approval Status"
                    value={booking.approvalStatus}
                    valueClassName={`${
                      booking.approvalStatus === "confirmed"
                        ? "text-green-600"
                        : booking.approvalStatus === "completed"
                        ? "text-blue-600"
                        : booking.approvalStatus === "canceled"
                        ? "text-red-600"
                        : "text-yellow-600"
                    } font-semibold capitalize`}
                  />
                  {/* Payment */}
                  <InfoBlock
                    icon={<CreditCard className="w-5 h-5 text-red-600" />}
                    label="Payment Status"
                    value={booking.status}
                    valueClassName={`${
                      booking.status === "Paid"
                        ? "text-green-600"
                        : booking.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    } font-semibold`}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex flex-col space-y-2 min-w-[150px]">
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

                  {booking.status === "Pending" && (
                    <p className="text-red-600 text-sm">
                      Payment Failed.{" "}
                      <span
                        className="text-blue-600 underline cursor-pointer"
                        onClick={() =>
                          router.push(`/tutors/${booking.tutorId}`)
                        }
                      >
                        Rebook
                      </span>
                    </p>
                  )}

                  {booking.status !== "Pending" &&
                    booking.approvalStatus !== "canceled" &&
                    (booking.status === "Paid" ||
                    booking.approvalStatus === "confirmed" ? (
                      <Button
                        variant="outline"
                        className="border-red-600 text-red-600"
                        onClick={() =>
                          toast(
                            "Contact support to cancel this confirmed booking."
                          )
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const InfoBlock = ({
  icon,
  label,
  value,
  valueClassName,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`text-base ${valueClassName || "text-gray-800"} break-words`}
      >
        {value}
      </p>
    </div>
  </div>
);

const ClockIcon = () => (
  <svg
    className="w-5 h-5 text-indigo-600"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6l4 2m4-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default BookingLists;

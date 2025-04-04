import BookingDetails from "@/components/modules/tutorDashboard/tutor-bookings/BookingDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Details",
  description: "View detailed information about your booking.",
};

const BookingDetailsPage = () => {
  return (
    <div>
      <BookingDetails />
    </div>
  );
};

export default BookingDetailsPage;

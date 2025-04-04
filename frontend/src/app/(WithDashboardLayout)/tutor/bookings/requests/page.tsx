import AllBookingRequests from "@/components/modules/tutorDashboard/booking-approval/AllBookingRequests";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Requests",
  description: "View and manage your booking requests.",
};

const BookingRequests = () => {
  return (
    <div>
      <AllBookingRequests />
    </div>
  );
};

export default BookingRequests;

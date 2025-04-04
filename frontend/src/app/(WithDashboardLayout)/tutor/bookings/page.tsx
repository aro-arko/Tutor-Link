import TutorBookings from "@/components/modules/tutorDashboard/tutor-bookings/TutorBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings",
  description: "View and manage your bookings as a tutor.",
};

const TutorBookingsPage = () => {
  return (
    <div>
      <TutorBookings />
    </div>
  );
};

export default TutorBookingsPage;

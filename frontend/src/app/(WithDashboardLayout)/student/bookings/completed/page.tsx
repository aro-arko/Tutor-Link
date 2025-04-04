import AllCompletedBookings from "@/components/modules/studentDashboard/completedBookings/AllCompletedBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Completed Bookings",
  description: "View all completed bookings.",
};

const CompletedBookingsPage = () => {
  return (
    <div>
      <AllCompletedBookings />
    </div>
  );
};

export default CompletedBookingsPage;

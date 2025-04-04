import AllActiveBookings from "@/components/modules/studentDashboard/activeBookings/AllActiveBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approved Bookings",
  description: "View all approved bookings.",
};

const ApprovedBookingsPage = () => {
  return (
    <div>
      <AllActiveBookings />
    </div>
  );
};

export default ApprovedBookingsPage;

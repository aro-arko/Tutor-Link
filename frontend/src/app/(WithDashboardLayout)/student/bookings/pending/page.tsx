import AllPendingBookings from "@/components/modules/studentDashboard/pendingBookings/AllPendingBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pending Bookings",
  description: "View all pending bookings.",
};
const PendingBookingsPage = () => {
  return (
    <div>
      <AllPendingBookings />
    </div>
  );
};

export default PendingBookingsPage;

import AllCanceledBookings from "@/components/modules/studentDashboard/canceledBookings/AllCanceledBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canceled Bookings",
  description: "View all canceled bookings.",
};

const CanceledBookingsPage = () => {
  return (
    <div>
      <AllCanceledBookings />
    </div>
  );
};

export default CanceledBookingsPage;

import MyBookings from "@/components/modules/studentDashboard/myBookings/MyBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings",
  description: "View all your bookings.",
};

const BookingsPage = () => {
  return (
    <div>
      <MyBookings />
    </div>
  );
};

export default BookingsPage;

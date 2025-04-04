import AllActiveSessions from "@/components/modules/tutorDashboard/activeSessions/AllActiveSessions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Sessions",
  description: "View and manage your active bookings.",
};

const ActiveBookingPage = () => {
  return (
    <div>
      <AllActiveSessions />
    </div>
  );
};

export default ActiveBookingPage;

import TutorDashbord from "@/components/modules/tutorDashboard/TutorDashbord";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Dashboard",
  description: "View your dashboard and manage your tutoring sessions.",
};

const TutorDashboardPage = () => {
  return (
    <div>
      <TutorDashbord />
    </div>
  );
};

export default TutorDashboardPage;

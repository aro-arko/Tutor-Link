import TutorDetails from "@/components/modules/studentDashboard/studentTutors/TutorDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Details",
  description: "View details of a specific tutor.",
};

const TutorDetailsPage = () => {
  return (
    <div>
      <TutorDetails />
    </div>
  );
};

export default TutorDetailsPage;

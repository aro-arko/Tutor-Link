import TutorDetails from "@/components/modules/tutors/TutorDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor Details",
  description: "Details of the selected tutor",
};

const TutorDetailsPage = () => {
  return (
    <div>
      <TutorDetails />
    </div>
  );
};

export default TutorDetailsPage;
